require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const DB_URL = process.env.DATABASE_URL

console.log('connecting to', DB_URL)

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const main = async () => {
  try {
    await sequelize.authenticate()
    const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
    console.log(notes)
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()

// docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres