/*************************** REQUIRES ***************************/
const express = require('express');

const { Genre } = require('../../db/models');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');

/*************************** ROUTES ***************************/

// GET all genres
router.get('/', asyncHandler(async (req, res) => {
  const genres = await Genre.findAll({
    attributes :['id','name']
  })

  return res.json({genres})
}))


/*************************** EXPORTS ***************************/

module.exports = router;