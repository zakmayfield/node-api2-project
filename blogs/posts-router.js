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
// verified

router.get('/:id', (req, res) => {
  const { id } = req.params
  //id that does not exist gives back []
  // post = [] ? 404 : post *doesn't work*

  Posts.findById(id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `Couldn't retrieve that for you`
      })
    })
})
//NOT verified

router.get('/:id/comments', (req, res) => {
  const {id} = req.params

  Posts.findPostComments(id)
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `Couldn't retrieve that for you`
      })
    })
})
//NOT verified


module.exports = router;