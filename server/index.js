const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/dbConnection')
const router = require('./routes/routes')

const serverApp = express()
const PORT = 3000 || process.env.PORT

serverApp.use(cors())
serverApp.use(express.json())
serverApp.use(router)

serverApp.listen(PORT, () => {
    console.log(`Server Started Running at Port ${PORT}`)
})

