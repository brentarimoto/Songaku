/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Song, User, Genre } = require('../../db/models');
const commentsRouter = require('./comments.js');
const likesRouter = require('./likes.js')

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { multiplePublicFileUpload, multipleMulterUpload, singlePublicFileDelete } = require('../../awsS3');

// Upload Song Validation
const validateSongs = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a title.')
      .isLength({ max:50 })
      .withMessage('Title must be less than 50 characters'),
    check('album')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an album name.')
      .isLength({ max:50 })
      .withMessage('Album name must be less than 50 characters'),
    check('genreId')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a genre.'),
    handleValidationErrors,
    validateSongFile,
    validateFileType,
];

function validateSongFile(req, res, next){
  if(!req.files.length){
    const err = createError('Please provide an audio file', 'File Not Provided', 400)
    console.log('ERROR', err)
    next(err)
    return
  }

  if(!req.files[0].mimetype.includes('audio')){
    const err = createError('Please provide an audio file', 'File Not Provided', 400)
    next(err)
    return
  }
  next()
}

const validatePutSongs = [
  check('title')
    .isLength({ max:50 })
    .withMessage('Title must be less than 50 characters'),
  check('album')
    .isLength({ max:50 })
    .withMessage('Album name must be less than 50 characters'),
    handleValidationErrors,
    validateFileType,
  ];

  function validateFileType(req, res, next){
    req.files.forEach((file)=>{
      if(!file.mimetype.includes('audio') && !file.mimetype.includes('image')){
        const err = createError('Please provide correct file type', 'Incorrect File Type', 422)
        next(err)
      }
    })
    next()
  }

/*************************** HELPER FUNCTIONS ***************************/

async function updateAlbumArts(song){
  if(!song.img){return false}

  const albumSongs = await Song.findAll({where:{album:song.album}})

  albumSongs.forEach(async(albumSong)=>{
    albumSong.img = (albumSong.img!==song.img) ? song.img : albumSong.img;
    await albumSong.save()
  })

  return true

}

async function deleteFromAWS(type, song){
  if(type!=='url' && type!=='img'){return false}

  let link = song[type]

  if(!link){return false}

  let key = link.match(/[^\/]+$/g)

  if(!key){return false}

  await singlePublicFileDelete(key[0])

  return true
}

function createError(message, title, status, errors=[]){
  const err = new Error(message)
  err.title = title
  err.errors= (errors.length) ? [...errors] : [message];
  err.status= status
  return err
}

/*************************** SONG ROUTES ***************************/

// GET all songs
router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll()

    return res.json({songs})
}))

// GET specific song
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const songId = req.params.id

  const song = await Song.findByPk(songId)

  return res.json({song})
}))


// --------- POST (UPLOAD) a song --------- //
router.post('/', multipleMulterUpload('files'), validateSongs,  asyncHandler(async (req, res, next) => {
  console.log('test')

  const {title, userId, album, genreId} = req.body

  const exists = await Song.findOne({
    where: {
      userId,
      album,
    }
  })

  if(title===(exists ? exists.title : exists)){
    const err = createError('Song Already Exists', 'Song Already Exists', 403)
    next(err)
  }

  if(req.files.length>1 && (exists ? exists.img : exists)){
    req.files.pop()
  }


  const files = await multiplePublicFileUpload(req.files)
  const url = files[0]
  let img = files[1] ? files[1] : null;
  img = exists ? (exists.img ? exists.img : img) : img;

  const tempSong = await Song.create({
    title,
    userId,
    album,
    url,
    img,
    genreId
  })

  const song = await Song.findByPk(tempSong.id, {
    include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName']}],
  })

  const reload = await updateAlbumArts(song)

  return res.json({song, reload})
}))



// --------- PUT --------- //
router.put('/:id(\\d+)', multipleMulterUpload('files'), validatePutSongs, asyncHandler(async (req, res, next) => {
  const {id} = req.params

  const tempSong = await Song.findByPk(id)

  if(!tempSong){
    const err = createError('Song Does Not Exists', 'Song Does Not Exists', 404)
    next(err)
  }

  const {title, userId, album, genreId} = req.body

  if(tempSong.userId!==parseInt(userId)){
    const err = createError('User Does Not Have Access', 'Access Denied', 401)
    next(err)
  }

  if (title){tempSong.title=title}
  if (genreId){tempSong.genreId=genreId}

  if(album){
    const albumExists = await Song.findOne({
      where:{
        album
      }
    })

    if(albumExists){
      tempSong.img=albumExists.img
    }

    tempSong.album=album
  }

  let url;
  let img;

  if(req.files.length){
    const files = await multiplePublicFileUpload(req.files)

    if(req.files.length>1){
      url = files[0]
      img = files[1]
    } else {
      url = (req.files.mimetype.includes('audio')) ? files[0]: null;
      img = (req.files.mimetype.includes('image')) ? files[0]: null;
    }
  }

  if(url){
    let urlDeleted = await deleteFromAWS('url', tempSong)
    tempSong.url=url
  }

  let reload=false;

  if(img){
    imgDeleted = await deleteFromAWS('img', tempSong)
    tempSong.img=img
    reload = await updateAlbumArts(tempSong)
  }

  tempSong.save();

  const song = await Song.findByPk(tempSong.id, {
    include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName']}],
  })

  return res.json({song, reload})
}))



// --------- DELETE --------- //
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const {id} = req.params

  const song = await Song.findByPk(id)

  if(!song){
    const err = createError('Song Does Not Exists', 'Song Does Not Exists', 404)
    next(err)
  }

  const album = await Song.findAll({
    where:{
      album:song.album
    }
  })

  let urlDeleted = await deleteFromAWS('url', song)

  if(!urlDeleted){
    const err = createError('Error with AWS Song Delete', 'Error with AWS Song Delete', 500)
    next(err)
  }

  let imgDeleted=true;

  if(album.length<=1){
    imgDeleted = await deleteFromAWS('img', song)
  }

  if(!imgDeleted){
    const err = createError('Error with AWS Image Delete', 'Error with AWS Image Delete', 500)
    next(err)
  }

  await song.destroy()

  return res.json({message:'success'})
}))

/*************************** COMMENT ROUTES ***************************/

router.use('/', commentsRouter)

/*************************** COMMENT ROUTES ***************************/

router.use('/', likesRouter)



/*************************** EXPORTS ***************************/

module.exports = router;