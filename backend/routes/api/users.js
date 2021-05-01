/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { setTokenCookie, restoreUser, requireAuth  } = require('../../utils/auth');
const { User, Song, Genre, Album } = require('../../db/models');
const playlistsRouter = require('./playlists');

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
//SIGN UP
router.get('/:id/songs', asyncHandler(async (req, res) => {
  const { id:userId } = req.params

  const songs = await Song.findAll({
    where:{userId},
    include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName']},{model:Album}],
  })

  res.json({songs})
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

/*************************** PLAYLIST ROUTES ***************************/
router.use('/', playlistsRouter)

/*************************** EXPORTS ***************************/

module.exports = router;