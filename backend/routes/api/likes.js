/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Like, Song, User } = require('../../db/models');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');


/*************************** LIKE ROUTES ***************************/

// GET all likes on a song
router.get('/:id(\\d+)/likes', asyncHandler(async (req, res) => {
  const songId = req.params.id

  const {UsersLikes:likes} = await Song.findByPk(songId,{include:[{ model:User, as: "UsersLikes"}]})

  return res.json({likeCount:likes.length})
}))


// POST a like on a song
router.post('/:id(\\d+)/likes', asyncHandler(async (req, res) => {
  const songId = req.params.id
  const {userId} = req.body

  const exists = await Like.findOne({
    where: {
      userId,
      songId
    }
  })

  if(exists){
    return res.status(403).json({message:'Like Already Exists'})
  }

  const newLike = await Like.create({
    userId,
    songId,
  })

  return res.json({message:'success'})

}))


// DELETE a like on a song
router.delete('/:id(\\d+)/likes/:likeId', asyncHandler(async (req, res) => {
  const songId = req.params.id
  const {userId} = req.body

  const existingLike = await Like.findOne({
    where: {
      userId,
      songId
    }
  })

  if(!existingLike){
    return res.status(404).json({message:'Like Does Not Exist'})
  }

  await existingComment.destroy()

  return res.json({message:'success'})
}))



/*************************** EXPORTS ***************************/

module.exports = router;