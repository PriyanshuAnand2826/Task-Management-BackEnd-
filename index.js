//requiring installed libraries 
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')



//requiring env variables 
const port =process.env.PORT
const UserRouter = require('./Routes/user')



//requiring files defined under project in different directories 
const {incomingRequestLogger} = require('./middlewares/index')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//using middlewares 
app.use(incomingRequestLogger)






//connection routes with index.js
app.use('/user',UserRouter)






//app listening on port  
app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
  mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to mongoDB')
  }).catch(()=>{
    console.log('failed to connect to mongoDB')
  })

})