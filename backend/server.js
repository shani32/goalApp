const express= require('express');
const router = require('./routes/goalRoutes');
const userRouter= require('./routes/userRoutes')
const colors= require('colors')
const dotenv= require('dotenv').config();
const {errorHandler}= require ('./middleware/errorMiddleware')
const connectDb= require('./config/db')
const PORT=process.env.PORT || 5000;

connectDb()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals', router)
app.use('/api/users', userRouter)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`server is up on port ${PORT}`)
})