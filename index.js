const express = require('express')
const { Sequelize, QueryTypes } = require('sequelize')
require('dotenv').config()
const Todo = require('./model.js')

const DB_URL = process.env.DATABASE_URL

console.log('connecting to psql', DB_URL)

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello OpenShift!</h1><p>redeployment works</p>')
})

app.get('/api/old_notes', (req, res) => {
  res.json(notes)
})

app.get('/api/todos', (request, response) => {
  Todo.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/todos', (request, response) => {
  const { content, done } = request.body

  if (content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const todo = new Todo({
    content,
    done: done || false,
  })

  todo.save().then(savedTodo => {
    response.json(savedTodo)
  })
})

app.get('/api/notes', async (req, res) => {
  const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  res.json(notes)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
