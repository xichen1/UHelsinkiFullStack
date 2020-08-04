const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { request, response } = require('express')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.likes) {
        blog.likes = 0
    }
    const blogResult = await blog.save()
    response.status(200).json(blogResult)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        likes: body.likes
    }
    const update = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(update.toJSON())


    // const blog = new Blog(request.body)
    // const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    // response.json(newBlog)

})

module.exports = blogsRouter