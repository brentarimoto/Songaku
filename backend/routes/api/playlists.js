/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Playlist, Song, User, Genre, Album } = require('../../db/models');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

// Upload Song Validation
const validatePlaylist = [
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a playlist name.'),
    handleValidationErrors,
];

/*************************** COMMENT ROUTES ***************************/

// GET a users playlists
router.get('/:id(\\d+)/playlists', asyncHandler(async (req, res) => {
  const userId = req.params.id

  const playlists = await Playlist.findAll( {
    where: {userId},
    include: [{
        model:Song,
        as:'SongsInPlaylist',
        include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName']},{model:Album}],
    }],
  })

  return res.json({playlists})
}))

// POST playlist
router.post('/:id(\\d+)/playlists', validatePlaylist, asyncHandler(async (req, res) => {
  const { id:userId } = req.params
  const {name} = req.body

  const playlist = await Playlist.create({
    userId,
    name
  })

  return res.json({playlist})

}))


// PUT (EDIT) comment on a song
router.put('/:id(\\d+)/playlists/:playlistId(\\d+)', validatePlaylist, asyncHandler(async (req, res) => {
  const { playlistId} = req.params
  const {name} = req.body

  const existingPlaylist = await Playlist.findByPk(playlistId,{
    include: [{
        model: Song,
        as:'SongsInPlaylist',
        include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName']},{model:Album}],
    }],
  })

  if(!existingPlaylist){
    return res.status(404).json({message:'Playlist Does Not Exist'})
  }

  existingPlaylist.name=name

  await existingPlaylist.save()

  return res.json({existingPlaylist})
}))


// DELETE a comment on a song
router.delete('/:id(\\d+)/comments/:playlistId(\\d+)', asyncHandler(async (req, res) => {
  const { playlistId } = req.params

  const existingPlaylist = await Playlist.findByPk(playlistId)

  if(!existingPlaylist){
    return res.status(404).json({message:'Comment Does Not Exist'})
  }

  await existingPlaylist.destroy()

  return res.json({message:'success'})
}))



/*************************** EXPORTS ***************************/

module.exports = router;