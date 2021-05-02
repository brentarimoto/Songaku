/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { setTokenCookie, restoreUser, requireAuth  } = require('../../utils/auth');
const { User, Song, Genre, Album } = require('../../db/models');
const playlistsRouter = require('./playlists');
const { createError } = require('../../utils/createError')

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

// Signup Validation
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

/*************************** USER ROUTES ***************************/
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { id:userId } = req.params

  const user = await User.findByPk(userId, {
    attributes:['id', 'userName', 'email', 'firstName', 'lastName', 'profilePic', 'about']
  })

  if(!user){
    const err = createError('User Does Not Exist', 'User Does Not Exist', 404)
    next(err)
  }


  res.json({user})
}));

/*************************** USER'S SONGS ROUTES ***************************/
//Get User's Songs
router.get('/:id(\\d+)/songs', asyncHandler(async (req, res) => {
  const { id:userId } = req.params

  const songs = await Song.findAll({
    where:{userId},
    include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName', 'id']},{model:Album}],
  })

  res.json({songs})
}));

//Get User's Albums
router.get('/:id(\\d+)/albums', asyncHandler(async (req, res) => {
  const { id:userId } = req.params

  const albums = await Album.findAll({
    where:{userId},
    include: [{
      model: Song,
      include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName', 'id']},{model:Album}],
    }]
  })

  res.json({albums})
}));


//SIGN UP
router.post('', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, userName: username, password });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
}));

/*************************** ALBUM UPDATE ***************************/

router.put('/:id(\\d+)/albums/:albumId', asyncHandler(async (req, res, next) => {
  const {albumId} = req.params
  const {name} = req.body

  const album = await Album.findByPk(albumId,{
    include: [{
      model: Song,
      include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName', 'id']},{model:Album}],
    }]
  })

  if(!album){
    const err = createError('Album Does Not Exist', 'Album Does Not Exist', 404)
    next(err)
  }

  album.name=name;

  await album.save();

  return res.json({album})
}))

/*************************** PLAYLIST ROUTES ***************************/
router.use('/', playlistsRouter)

/*************************** EXPORTS ***************************/

module.exports = router;