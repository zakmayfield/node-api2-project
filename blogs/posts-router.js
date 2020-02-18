const express = require('express');
const Posts = require('../data/db.js')
const router = express.Router();


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

  Posts.findById(id)
    .then(post => {
      !post[0]
        ? res.status(404).json({ message: "That id does not exist" })
        : res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `Couldn't be retrieved`
      })
    })
})
// verified

router.get('/:id/comments', (req, res) => {
  const { id } = req.params

  Posts.findPostComments(id)
    .then(comment => {
      comment[0] ? res.status(200).json(comment) : res.status(404).json({ message: "Those comments couldn't be found" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `Couldn't retrieve that for you`
      })
    })
})
// verified


router.post('/', (req, res) => {
  const payload = req.body

  !payload.title || !payload.contents
  ? res.status(400).json({message: 'Please include title and contents'})
  : Posts.insert(payload)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ messgae: "can't make that happen" })
      })
})
// verified

router.post('/:id/comments', (req, res) => {
  const { id } = req.params
  const payload = { ...req.body, post_id: id }

  console.log(payload)

  if(payload.text){
    Posts.findById(id)
      .then(post => {
        !post[0]
          ? res.status(404).json({ message: "That id does not exist" })
          : Posts.insertComment(payload)
              .then(comment => {
                res.status(201).json(comment)
              })
              .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
              })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: `Couldn't be retrieved`
        })
      })
  }else{
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
  }
})
// verified

router.delete("/:id", (req, res) => {
  const { id } = req.params

  Posts.remove(id)
    .then(removedPost => {
      removedPost === 1 
      ? res.status(200).json(removedPost) 
      : res.status(404).json({ message: "That post doesn't exist" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Couldnt remove post' })
    })
})
// verified

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  if(req.body.title && req.body.contents){
    console.log('both title and contents exist')
    Posts.findById(id)
      .then(post => {
        !post[0]
          ? res.status(404).json({ message: "That id does not exist" })
          : Posts.update(id, payload)
              .then(updatedPost => {
                res.status(200).json(updatedPost)
              })
              .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
              })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: `Couldn't be retrieved`
        })
      })
  }else{
    console.log('title or contents do not exist')
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
})
//NOT verified

module.exports = router;