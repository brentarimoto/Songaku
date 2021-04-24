/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { setTokenCookie, restoreUser, requireAuth  } = require('../../utils/auth');
const { Song } = require('../../db/models');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

// Upload Song Validation
const validateSongs = [
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

/*************************** ROUTES ***************************/

//GET all songs
router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll()

    return res.json({songs})
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const songId = req.params.id

  const song = await Song.findByPk(songId)

  return res.json({song})
}))

router.post('/', asyncHandler(async (req, res) => {
  const {title, userId, album, music, genreId} = req.body

  const song = await Song.findByPk(songId)

  return res.json({song})
}))


/*************************** EXPORTS ***************************/

module.exports = router;