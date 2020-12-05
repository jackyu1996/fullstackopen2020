const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });

  res.json(blogs.map((b) => b.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
  const decodedToken = await jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!(req.body.url && req.body.title)) {
    return res.status(400).json({ error: 'url and title are compulsory' });
  }

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    user: decodedToken.id,
    url: req.body.url,
    likes: req.body.likes,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const idToUpdate = req.params.id;
  const blogToUpdate = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  const decodedToken = await jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(idToUpdate);

  if (!blog) {
    return res.status(404).json({ error: 'there is nothing to update' });
  }

  await Blog.findByIdAndUpdate(
    idToUpdate,
    blogToUpdate,
    { new: true },
  );
  return res.status(204).end();
});

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = await jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ error: 'there is nothing to delete' });
  }

  if (blog.user.toString() === decodedToken.id) {
    await Blog.deleteOne(blog);
    return res.status(204).end();
  }
  return res.status(401).json({ error: 'you have no right to delete this one' });
});

module.exports = blogsRouter;
