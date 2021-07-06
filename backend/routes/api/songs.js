/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Op, Sequelize } = require("sequelize");

const { Song, User, Genre, Album, Like } = require('../../db/models');
const commentsRouter = require('./comments.js');
const likesRouter = require('./likes.js')
const { createError } = require('../../utils/createError')

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

async function deleteFromAWS(item){
  let link = item.url

  if(!link){return false}

  let key = link.match(/[^\/]+$/g)

  if(!key){return false}

  await singlePublicFileDelete(key[0])

  return true
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

  if(!song){
    const err = createError('Song Does Not Exists', 'Song Does Not Exists', 404)
    next(err)
  }

  return res.json({song})
}))


// --------- POST (UPLOAD) a song --------- //
router.post('/', multipleMulterUpload('files'), validateSongs,  asyncHandler(async (req, res, next) => {
  const {title, userId, album, genreId} = req.body

  const existingAlbum = await Album.findOne({
    where: {name:album, userId},
    include: [{model:Song}]
  })

  if(existingAlbum){
    const songTitles= existingAlbum.Songs.map((song)=>{
      return song.title
    })

    if(songTitles.includes(title)){
      const err = createError('Song Already Exists In Album', 'Song Already Exists In Album', 403)
      next(err)
    }
  }

  if(req.files.length>1 && (existingAlbum ? existingAlbum.url : null)){
    req.files.pop()
  }

  const files = await multiplePublicFileUpload(req.files)
  const url = files[0]
  let imgUrl = files[1] ? files[1] : null;
  imgUrl = existingAlbum ? (existingAlbum.url ? existingAlbum.url : imgUrl) : imgUrl;

  let albumId;
  let reload;

  if(existingAlbum){
    albumId=existingAlbum.id
    if(imgUrl){
      existingAlbum.url=imgUrl
      await existingAlbum.save()
      reload=true;
    }
  } else{
    const newAlbum = await Album.create({
      userId,
      name:album,
      url:imgUrl
    })
    albumId=newAlbum.id
    reload=true;
  }

  const newSong = await Song.create({
    title,
    userId,
    albumId,
    url,
    genreId
  })

  const song = await Song.findByPk(newSong.id, {
    include: [{model: Genre, attributes:['name' ,'id']}, {model:User,attributes:['userName', 'id', 'profilePic']},{model:Album}],
  })

  return res.json({song, reload})
}))



// --------- PUT --------- //
router.put('/:id(\\d+)', multipleMulterUpload('files'), validatePutSongs, asyncHandler(async (req, res, next) => {
  const {id} = req.params

  const tempSong = await Song.findByPk(id)

  if(!tempSong){
    const err = createError('Song Does Not Exist', 'Song Does Not Exist', 404)
    next(err)
  }

  const {title, userId, album, genreId} = req.body

  if(tempSong.userId!==parseInt(userId)){
    const err = createError('User Does Not Have Access', 'Access Denied', 401)
    next(err)
  }

  if (title){tempSong.title=title}
  if (genreId){tempSong.genreId=genreId}

  let url;
  let imgUrl;

  if(req.files.length){
    const files = await multiplePublicFileUpload(req.files)

    if(req.files.length>1){
      url = files[0]
      imgUrl = files[1]
    } else {
      url = (req.files[0].mimetype.includes('audio')) ? files[0]: null;
      imgUrl = (req.files[0].mimetype.includes('image')) ? files[0]: null;
    }
  }

  if(url){
    let urlDeleted = await deleteFromAWS(tempSong)
    tempSong.url=url
  }

  let reload;

  const currentAlbum = await Album.findByPk(tempSong.albumId,{include:Song})

  if(album && album!==currentAlbum.name){
    let albumExists = await Album.findOne({
      where:{
        name: (album)
      }
    })

    if(albumExists){

      if(imgUrl){
        imgDeleted = await deleteFromAWS(albumExists)
        albumExists.url=imgUrl
        await albumExists.save()
        reload = true;
      }

      tempSong.albumId = albumExists.id

    } else{
      const newAlbum = await Album.create({
        userId,
        name:album,
        url:imgUrl
      })
      tempSong.albumId = newAlbum.id
      reload=true
    }

    await tempSong.save();

    if(currentAlbum.Songs.length<=1){
      await currentAlbum.destroy()
      reload=true;
    }

  } else{
    if(imgUrl){
      imgDeleted = await deleteFromAWS(currentAlbum)
      currentAlbum.url=imgUrl
      await currentAlbum.save()
      reload = true;
    }
  }

  await tempSong.save();

  const song = await Song.findByPk(tempSong.id, {
    include: [{model: Genre, attributes:['name' ,'id']}, {model:User,attributes:['userName', 'id', 'profilePic']},{model:Album}],
  })

  return res.json({song, reload})
}))



// --------- DELETE --------- //
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const {id} = req.params

  const song = await Song.findByPk(id,{
    include: Album
  })

  if(!song){
    const err = createError('Song Does Not Exists', 'Song Does Not Exists', 404)
    next(err)
  }

  const {albumId} = req.body

  const album = await Song.findAll({where:{albumId}})

  let urlDeleted = await deleteFromAWS(song)

  if(!urlDeleted){
    const err = createError('Error with AWS Song Delete', 'Error with AWS Song Delete', 500)
    next(err)
  }

  let imgDeleted=true;
  let reload;

  if(album.length<=1){
    const lastAlbum = await Album.findByPk(song.Album.id)

    if(song.Album.url){imgDeleted = await deleteFromAWS(song.Album)}

    if(!imgDeleted){
      const err = createError('Error with AWS Image Delete', 'Error with AWS Image Delete', 500)
      next(err)
    }

    await lastAlbum.destroy();
    reload=true;

  } else {
    await song.destroy()
  }

  return res.json({message:'success', reload})
}))

/*************************** COMMENT ROUTES ***************************/

router.use('/', commentsRouter)

/*************************** COMMENT ROUTES ***************************/

router.use('/', likesRouter)

/*************************** SUGGESTIONS ROUTES ***************************/

// GET specific song
router.post('/search', asyncHandler(async (req, res) => {
  const {string}=req.body
  // const req.body
  const songs = await Song.findAll({
    where: {
      [Op.or] : [
        {title: {
          [Op.iLike]: `%${string}%`
        }},
        {'$Genre.name$': {
          [Op.iLike]: `%${string}%`
        }},
        {'$User.userName$': {
          [Op.iLike]: `%${string}%`
        }},
        {'$Album.name$': {
          [Op.iLike]: `%${string}%`
        }}
      ]
    },
    include: [{model: Genre, attributes:['name', 'id'], as: 'Genre'}, {model:User,attributes:['userName', 'id', 'profilePic'], as:'User'},{model:Album, as: 'Album'}],
  });

  return res.json({songs})
}))

/******SORTING FUNCTION********/

function quickSort(array) {
  if(array.length <= 1) {
    return array;
  }

  let left = [];
  let right = [];
  let pivot = array[0]
  let pivotValue= array[0][0];
  let middle = [pivot];



  for(let i = 1; i < array.length; i++) {
    if (array[i][0] > pivotValue) {
        left.push(array[i]);
    } else if (array[i][0] < pivotValue) {
      right.push(array[i]);
    } else {
      middle.push(array[i]);
    }
  }

  return [...quickSort(left), ...middle, ...quickSort(right)];
}


// GET Top Songs of specific genre
router.get('/suggestions/likes', asyncHandler(async (req, res) => {
  let {type, value} = req.body

  const songs = await Song.findAll({
    include: [{model: Genre, attributes:['name','id']}, {model:User,attributes:['userName', 'id', 'profilePic']},{model:Album},{model:Like}],
  })

  const likeCount = songs.map((song, i)=>{
    return [song.Likes.length, i]
  })

  const sortedLikeCount = quickSort(likeCount)

  const topSongs=[]

  const number = (songs.length>10) ? 10: songs.length;

  for(let i=0;i<number;i++){
    topSongs.push(songs[sortedLikeCount[i][1]])
  }

  return res.json({topSongs})
}))



// GET Top Songs of specific genre
router.post('/suggestions/likes/songs', asyncHandler(async (req, res) => {
  let {type, value} = req.body


  const songs = await Song.findAll({
    include: [{model: Genre, attributes:['name','id']}, {model:User,attributes:['userName', 'id', 'profilePic']},{model:Album},{model:Like}],
    where: (type ? {[type]:value} : null)
  })

  const likeCount = songs.map((song, i)=>{
    return [song.Likes.length, i]
  })

  const sortedLikeCount = quickSort(likeCount)

  const topSongs=[]

  const number = (songs.length>3) ? 3: songs.length;

  for(let i=0;i<number;i++){
    topSongs.push(songs[sortedLikeCount[i][1]])
  }

  return res.json({topSongs})
}))


/*************************** EXPORTS ***************************/

module.exports = router;