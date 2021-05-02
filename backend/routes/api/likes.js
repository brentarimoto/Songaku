/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Like, Song, User } = require('../../db/models');
const { createError } = require('../../utils/createError')

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');


/*************************** LIKE ROUTES ***************************/

// GET all likes on a song
router.get('/:id(\\d+)/likes', asyncHandler(async (req, res) => {
  const songId = req.params.id

  const likes = await Like.findAll({
    where:{songId},
    include: [{model: User, attributes: ['userName','id']}]
  })

  return res.json({likes})
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
    const err = createError('Like Already Exists', 'Like Already Exists', 403)
    next(err)
  }

  const newLike = await Like.create({
    userId,
    songId,
  })

  return res.json({createdAt: newLike.createdAt})

}))


// DELETE a like on a song
router.delete('/:id(\\d+)/likes/', asyncHandler(async (req, res) => {
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

  await existingLike.destroy()

  return res.json({message:'success'})
}))



/*************************** EXPORTS ***************************/

module.exports = router;