const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('connected', () => {
  
    console.log(`listening to ${db.host} at ${db.port}`)
})



