const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!(request.token && decodedToken)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    console.log(user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id
    })
    if (!blog.likes) {
        blog.likes = 0
    }

    const blogResult = await blog.save()
    user.blogs = user.blogs.concat(blogResult._id)
    await user.save()
    response.json(blogResult)


})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!(decodedToken && request.token)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    user.blogs = (user.blogs).filter(b => b.toString() !== request.params.id)

    await user.save()
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