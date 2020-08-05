const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, author: 1, title: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const nameValid = body.username === null
        ? false
        : body.username.length >= 3
    const passwordValid = body.password === null
        ? false
        : body.password.length >= 3

    if (!(passwordValid && nameValid)) {
        return response.status(400).json({ error: 'username or password not valid' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await newUser.save()
    response.json(savedUser)
})

module.exports = usersRouter