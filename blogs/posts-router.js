const express = require('express');
const Posts = require('../data/db.js')
const router = express.Router()

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `Couldn't retrieve that for you`
      })
    })
})

module.exports = router;