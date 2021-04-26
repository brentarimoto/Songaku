/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Song, User } = require('../../db/models');
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
    check('url')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an audio file.'),
    check('genreId')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a genre.'),
    handleValidationErrors,
];

const validatePutSongs = [
  check('title')
    .isLength({ max:50 })
    .withMessage('Title must be less than 50 characters'),
  check('album')
    .isLength({ max:50 })
    .withMessage('Album name must be less than 50 characters'),
  handleValidationErrors,
];

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

// POST (UPLOAD) a song
router.post('/', multipleMulterUpload('files'), validateSongs, asyncHandler(async (req, res) => {
  const {title, userId, album, genreId} = req.body

  // console.log(req.file)
  const exists = await Song.findOne({
    where: {
      title,
      userId,
      album,
    }
  })

  if(exists){
    return res.status(403).json({message:'Song Already Exists'})
  }

  const albumExists = await Song.findOne({
    where:{
      userId,
      album,
    }
  })

  if (albumExists){
    req.files.pop()
  }

  const files = await multiplePublicFileUpload(req.files)
  const url = files[0]
  let img = files[1] ? files[1] : null;
  img = albumExists ? albumExists.img : img;

  const song = await Song.create({
    title,
    userId,
    album,
    url,
    img,
    genreId
  })

  return res.json({song})
}))

// PUT
router.put('/:id', validatePutSongs, asyncHandler(async (req, res) => {
  const id = req.params.id

  const song = await Song.findByPk(id)

  if(!song){
    return res.status(404).json({message: 'Error, song not found'})
  }

  const { title, album, genreId } = req.body

  if (title){song.title=title}
  if (genreId){song.genreId=genreId}

  if(album){
    const albumExists = await Song.findOne({
      where:{
        album
      }
    })

    if(albumExists){
      song.img=albumExists.img
    }

    song.album=album
  }

  song.save();

  return res.json({song})
}))

// DELETE
router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id

  const song = await Song.findByPk(id)

  if(!song){
    return res.status(404).json({message: 'Error, song not found'})
  }

  const songKey = song.url.match(/[^\/]+$/g)[0]

  let imgKey;

  const album = await Song.findAll({
    where:{
      album:song.album
    }
  })

  if(song.img && album.length<=1){
    imgKey = song.img.match(/[^\/]+$/g)[0]
  }

  await singlePublicFileDelete(songKey)

  if(imgKey){
    await singlePublicFileDelete(imgKey)
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