const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb://admin:LigLiIO3sBVL94zI@cluster0-shard-00-00-h8mtn.mongodb.net:27017,cluster0-shard-00-01-h8mtn.mongodb.net:27017,cluster0-shard-00-02-h8mtn.mongodb.net:27017/node-angular?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true")
.then(() => {
  console.log("Connected to Mongo DB");
})
.catch(()=>{
  console.log("Connection Failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Access');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});
// LigLiIO3sBVL94zI
app.post('/api/posts',(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  })
});

app.use('/api/posts',(req, res, next) =>{
  const posts = [
    {
      id: 'dadf121212',
      title: 'First serverside stuff',
      content: 'Coming from the server!'
    },
    {
      id: 'asdfasdf',
      title: 'Second serverside stuff',
      content: 'Coming from the server!!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
