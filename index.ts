import express from 'express'
import userRoutes from './src/routes/userRoutes'
import tweetRoutes from './src/routes/tweetRoutes'
import authRoutes from './src/routes/authRoutes'

const app= express()
app.use(express.json())
app.use('/user',userRoutes)
app.use('/tweet',tweetRoutes)
app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send("Hey it's working")
})



app.listen(3000, ()=>{
    console.log("server ready ad localhost.3000")
})