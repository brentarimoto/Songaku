/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Playlist, Song, User, Genre, Album, PlaylistSong } = require('../../db/models');
const { createError } = require('../../utils/createError')

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

/*************************** PLAYLIST ROUTES ***************************/

// GET a users PLAYLISTS
router.get('/:id(\\d+)/playlists', asyncHandler(async (req, res) => {
  const userId = req.params.id

  const playlists = await Playlist.findAll( {
    where: {userId},
    include: [{
        model:Song,
        as:'SongsInPlaylist',
        include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName', 'id']},{model:Album}],
    }],
  })

  return res.json({playlists})
}))

// POST PLAYLIST
router.post('/:id(\\d+)/playlists', validatePlaylist, asyncHandler(async (req, res) => {
  const { id:userId } = req.params
  const {name} = req.body

  const playlist = await Playlist.create({
    userId,
    name
  })

  return res.json({playlist})

}))


// PUT (EDIT) PLAYLIST
router.put('/:id(\\d+)/playlists/:playlistId(\\d+)', validatePlaylist, asyncHandler(async (req, res) => {
  const { playlistId} = req.params
  const {name} = req.body

  const existingPlaylist = await Playlist.findByPk(playlistId,{
    include: [{
        model: Song,
        as:'SongsInPlaylist',
        include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName', 'id']},{model:Album}],
    }],
  })

  if(!existingPlaylist){
    const err = createError('Playlist Does Not Exist', 'Playlist Does Not Exist', 403)
    next(err)
  }

  existingPlaylist.name=name

  await existingPlaylist.save()

  return res.json({existingPlaylist})
}))


// DELETE PLAYLIST
router.delete('/:id(\\d+)/playlists/:playlistId(\\d+)', asyncHandler(async (req, res, next) => {
  const { playlistId } = req.params

  console.log(playlistId)

  const existingPlaylist = await Playlist.findByPk(playlistId)

  if(!existingPlaylist){
    const err = createError('Playlist Does Not Exist', 'Playlist Does Not Exist', 403)
    next(err)
  }

  await existingPlaylist.destroy()

  return res.json({message:'success'})
}))


/*************************** SONGS ON PLAYLIST ROUTES ***************************/
// POST song to playlist
router.post('/:id(\\d+)/playlists/:playlistId/song', asyncHandler(async (req, res) => {
  const { playlistId } = req.params
  const {songId} = req.body

  const playlist = await Playlist.findByPk(playlistId)

  if(!playlist){
    const err = createError('Playlist Does Not Exist', 'Playlist Does Not Exist', 404)
    next(err)
  }

  const song = await Song.findByPk(songId,{
    include: [{model: Genre, attributes:['name']}, {model:User,attributes:['userName', 'id']},{model:Album}],
  })

  if(!song){
    const err = createError('Song Does Not Exist', 'Song Does Not Exist', 404)
    next(err)
  }

  await PlaylistSong.create({
    playlistId,
    songId
  })

  return res.json({song})

}))

// DELETES song to playlist
router.delete('/:id(\\d+)/playlists/:playlistId/song', asyncHandler(async (req, res) => {
  const { playlistId } = req.params
  const {songId} = req.body

  const existingPlaylistSong= await PlaylistSong.findOne({where:{playlistId,songId}})

  if(!PlaylistSong){
    const err = createError('Song Does Not Exist In Playlist', 'Song Does Not Exist In Playlist', 404)
    next(err)
  }

  await existingPlaylistSong.destroy()

  return res.json({PlaylistSong})

}))

/*************************** EXPORTS ***************************/

module.exports = router;