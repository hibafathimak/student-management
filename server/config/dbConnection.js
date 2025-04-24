const mongoose = require('mongoose')

mongoose.connect(process.env.DBCONNECTIONSTRING).then(res => {
    console.log("DB Connection Success!!")
}).catch(err => {
    console.log("DB Connection Failed!!")
    console.log(err)
})