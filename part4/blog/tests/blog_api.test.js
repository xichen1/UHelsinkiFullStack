const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const help = require('./helper_test')



beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = help.initialNotes
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('get right number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(help.initialNotes.length)
})

test('have attribute id', async () => {
    const response = await api.get('/api/blogs')
    const promisearr = response.body.map(res => expect(res.id).toBeDefined())
    await Promise.all(promisearr)
})

test('a valid post can be added', async () => {
    const newBlog = {
        title: "goodbye",
        author: "her",
        likes: 5,
        url: "wwwc"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogAtEnd = await help.blogsInDb()
    expect(blogAtEnd).toHaveLength(help.initialNotes.length + 1)
})

test('no like auto 0', async () => {
    const newBlog = {
        title: "no like",
        author: "me",
        url: "wwwd"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const blogAtEnd = await help.blogsInDb()
    const likes = blogAtEnd.map(blog => blog.likes)
    expect(likes).toContain(0)
})

test('a non-valid post cannot be added', async () => {
    const newBlog = {
        author: "her",
        likes: 5
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogAtEnd = await help.blogsInDb()
    expect(blogAtEnd).toHaveLength(help.initialNotes.length)
})

test('deletion of a blog', async () => {
    const blogAtStart = await help.blogsInDb()
    const noteToDelete = blogAtStart[0]

    await api
        .delete(`/api/blogs/${noteToDelete.id}`)
        .expect(204)

    const afterDelelte = await help.blogsInDb()
    expect(afterDelelte).toHaveLength(help.initialNotes.length - 1)
})

test('update one blog', async () => {
    const blogAtStart = await help.blogsInDb()
    const noteToUpdate = blogAtStart[0]

    const newBlog = {
        likes: 200
    }
    await api
        .put(`/api/blogs/${noteToUpdate.id}`)
        .send(newBlog)
        .expect(200)
})

afterAll(() => {
    mongoose.connection.close()
})