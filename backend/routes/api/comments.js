/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator')

const { Comment, Song, User, } = require('../../db/models');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

// Upload Song Validation
const validateComment = [
    check('comment')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a comment.'),
    handleValidationErrors,
  ];

/*************************** COMMENT ROUTES ***************************/

// GET a song's comments
router.get('/:id(\\d+)/comments', asyncHandler(async (req, res) => {
  const songId = req.params.id

  const comments = await Comment.findAll( {
    where: {songId},
    include: [{model:User, attributes:['userName', 'profilePic']}],
    order: [['id']]
  })

  return res.json({comments})
}))

// POST comment to a song
router.post('/:id(\\d+)/comments', validateComment, asyncHandler(async (req, res) => {
  const { id:songId } = req.params
  const {comment, userId} = req.body

  const newCom = await Comment.create({
    userId,
    songId,
    comment
  })

  const newComment = await Comment.findByPk(newCom.id, {
    include: [{model:User, attributes:['userName', 'profilePic']}],
    order: [['id']]
  })

  return res.json({newComment})

}))


// PUT (EDIT) comment on a song
router.put('/:id(\\d+)/comments/:commentId', asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const {comment} = req.body

  const existingComment = await Comment.findByPk(commentId, {
    include: [{model:User, attributes:['userName', 'profilePic']}],
    order: [['id']]
  })

  if(!existingComment){
    return res.status(404).json({message:'Comment Does Not Exist'})
  }

  existingComment.comment=comment

  await existingComment.save()

  return res.json({existingComment})
}))


// DELETE a comment on a song
router.delete('/:id(\\d+)/comments/:commentId(\\d+)', asyncHandler(async (req, res) => {
  const { commentId } = req.params

  const existingComment = await Comment.findByPk(commentId)

  if(!existingComment){
    return res.status(404).json({message:'Comment Does Not Exist'})
  }

  await existingComment.destroy()

  return res.json({message:'success'})
}))



/*************************** EXPORTS ***************************/

module.exports = router;