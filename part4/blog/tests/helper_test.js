const Blog = require('../models/blog')

const initialNotes = [
    {
        title: "my app",
        author: "me",
        likes: 10,
        url: "wwwa"
    },
    {
        title: "hello,world",
        author: "him",
        likes: 2,
        url: "wwwb"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialNotes,
    blogsInDb
}