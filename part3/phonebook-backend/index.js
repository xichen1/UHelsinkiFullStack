const express = require('express')
const app = express()
require('dotenv').config()
const Phone = require('./module/phone')

const cors = require('cors')

const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url - :body'))
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>hello</h1>')
})

app.get('/api/persons', (request, response) => {
  Phone.find({}).then(phones => {
    response.json(phones)
  })
})

app.get('/info', (request, response) => {
  const l = persons.length
  const t = new Date()
  response.send(`<p>
    Phonebook has info for ${l} people. <br />
    ${t}
  </p>`)
})

app.get('/api/persons/:id', (request, response) => {
  Phone.findById(request.params.id).then(phone=>{
    response.json(phone)
  })
  .catch(error => {
    console.log(error.message)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))

})

// const generateId = () => {
//   const maxId = persons.length > 0
//   ? Math.max(...persons.map(note => note.id))
//   : 0
//   return maxId + 1
// }
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body)
  if (!body) {
    return response.status(404).json({
      error: 'missing'
    })
  } 
  // else if (persons.find(person => person.name === body.name)) {
  //   return response.status(404).json({
  //     error: 'name must be unique'
  //   })
  // }

  const phone = new Phone({
    name: body.name,
    number: body.number
  })

  phone.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port)
console.log(`server running on port ${port}`)