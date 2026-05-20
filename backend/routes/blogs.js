const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({ order: [['createdAt', 'DESC']] });
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const newPost = await Blog.create(req.body);
  res.json(newPost);
});

module.exports = router;