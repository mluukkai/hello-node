require('dotenv').config()
const Todo = require('./model.js')

console.log(process.argv.length)

if (process.argv.length>3) {
  setTimeout(() => {
    const content = process.argv[2]
    const done = Boolean(process.argv[3])
    
    const todo = new Todo({content, done})
    todo.save().then((res) => {
      console.log(res)
      process.exit()
    })
    
  }, 1000)
} else {
  process.exit()
}