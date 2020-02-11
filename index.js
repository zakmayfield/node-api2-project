const express = require('express')

const postsRouter = require('./blogs/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
  res.send(`<h1>Server up and running</h1>`)
})

server.listen(4000, () => {
  console.log(`\n Server listening on port 4000 \n`)
})