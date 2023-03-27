const express = require('express')
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
  res.send('<h1>Hello OpenShift!</h1><p>does this work?</p>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
