const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', userExtractor, (request, response, next) => {
  let blog = request.body
  if ( !('likes' in blog) ) {
    blog = { ...blog, likes: 0 }
  }
  blog = { ...blog, user: request.user }
  const newBlog = new Blog(blog)
  newBlog
    .save()
    .then(result => {
      Blog.findById(result._id)
        .populate('user')
        .then(newBlog => {
          response.status(201).json(newBlog)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === request.user) {
      const result = await Blog.findByIdAndDelete(request.params.id)
      response.status(200).json(result)
    } else {
      response.status(401).json({ error: 'You are not the owner of this blog entry' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  try {
    const modifiedBlog = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, modifiedBlog, { new: true })
    response.status(200).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter