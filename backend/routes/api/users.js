6/*************************** REQUIRES ***************************/
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
const { singleMulterUpload, singlePublicFileUpload, singlePublicFileDelete } = require('../../awsS3');

// Signup Validation
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an email.')
      .isEmail()
      .withMessage('Please provide a valid email.')
      .custom((value) => {
        return User.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject(
              "The provided email is already in use by another account"
            );
          }
        });
      }),
    check('userName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a username.')
      .isLength({ min: 3 })
      .withMessage('Please provide a username with at least 3 characters.'),
    check('userName')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.')
      .custom((value,  { req }) => {
        return User.findOne({ where: { userName: value } }).then((user) => {
          if (user && user.id!==parseInt(req.id)) {
            return Promise.reject(
              "The provided username is already in use by another account"
            );
          }
        });
      }),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

// Signup Edit
const validateEdit = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ min: 3 })
    .withMessage('Please provide a username with at least 3 characters.'),
  check('userName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.')
    .custom((value, {req}) => {
      return User.findOne({ where: { userName: value } }).then((user) => {
        if (user && user.id!==parseInt(req.body.id)) {
          return Promise.reject(
            "The provided username is already in use by another account"
          );
        }
      });
    }),
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

//SIGN UP
router.post('', singleMulterUpload('file'), validateSignup, asyncHandler(async (req, res) => {
  const { email, password, userName } = req.body;

  let profilePic = null

  if (req.file){
    profilePic = await singlePublicFileUpload(req.file)
  }

  const user = await User.signup({ email, userName, password, profilePic});

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
}));



//EDIT
router.put('', singleMulterUpload('file'), validateEdit, asyncHandler(async (req, res) => {
  let {id, userName, about} = req.body

  if (about==='undefined' || about==='null'){
    about=null
  }

  const user = await User.findByPk(id)

  if (!user){
    const err = createError('User Does Not Exist', 'User Does Not Exist', 404)
    next(err)
  }

  let profilePic = null


  if (userName && userName!==user.userName){
    user.userName=userName
  }

  if (about!==user.about){
    user.about=about
  }

  if (req.file){
    profilePic = await singlePublicFileUpload(req.file)
  }

  if (profilePic && profilePic!==user.profilePic){
    if(user.profilePic){
      if(user.profilePic.includes('songakubucket')){
        const array = user.profilePic.split('/')
        const key = array[array.length-1]
        const deleted = await singlePublicFileDelete(key)

        if (!deleted){
          const err = createError('Could Not Delete ProfilePic', 'Could Not Delete ProfilePic', 500)
          next(err)
        }
      }
    }
    user.profilePic=profilePic
  }

  await user.save()


  return res.json({
    user
  });
}));

/*************************** USER'S SONGS ROUTES ***************************/
//Get User's Songs
router.get('/:id(\\d+)/songs', asyncHandler(async (req, res) => {
  const { id:userId } = req.params

  const songs = await Song.findAll({
    where:{userId},
    include: [{model: Genre, attributes:['name' ,'id']}, {model:User,attributes:['userName', 'id', 'profilePic']},{model:Album}],
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
      include: [{model: Genre, attributes:['name' ,'id']}, {model:User,attributes:['userName', 'id', 'profilePic']},{model:Album}],
    }]
  })

  res.json({albums})
}));

/*************************** ALBUM UPDATE ***************************/

router.put('/:id(\\d+)/albums/:albumId', asyncHandler(async (req, res, next) => {
  const {albumId} = req.params
  const {name} = req.body

  const album = await Album.findByPk(albumId,{
    include: [{
      model: Song,
      include: [{model: Genre, attributes:['name' ,'id']}, {model:User,attributes:['userName', 'id', 'profilePic']},{model:Album}],
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