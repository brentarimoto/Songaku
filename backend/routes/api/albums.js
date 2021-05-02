/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Playlist, Song, User, Genre } = require('../../db/models');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

/*************************** COMMENT ROUTES ***************************/

// GET a users playlists
router.get('/:id(\\d+)/albums', asyncHandler(async (req, res) => {
  const userId = req.params.id

  const songs = await Song.findAll( {
    where: {userId},
    include: [{
        model:Song,
        as:'SongsInPlaylist',
        include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName', 'id']},{model:Album}],
    }],
  })

  return res.json({album})
}))


/*************************** EXPORTS ***************************/

module.exports = router;