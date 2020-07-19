const express = require('express')
const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
const app = express()
app.use(express.json())
app.use(morgan(':method :url - :body'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-53253235",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-2345656",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/', (request, response) => {
  response.send('<h1>hello</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
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
  const id = Number(request.params.id)
  const data = persons.find(person => person.id === id)

  if (!data) {
    response.status(404).end()
  } else {
    response.json(data)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const data = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(note => note.id))
  : 0
  return maxId + 1
}
app.post('/api/persons', (request, response) => {
  const body = request.body


  if (!body) {
    return response.status(404).json({
      error: 'missing'
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(404).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

const port = 3001
app.listen(port)
console.log(`server running on port ${port}`)