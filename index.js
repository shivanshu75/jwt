const express=require('express')
const dotev=require('dotenv').config()
const dbConnection=require('./model/db')
const router=require('./routes/user.routes')
const app=express()


app.use(express.json())
app.use('/api',router)



dbConnection
.then(()=>{
    console.log("DB Connect")
})
.catch((e)=>{
    console.log("Not Connect",e)
})

app.listen((3001),()=>{
    console.log("Serverr Sertaed")
})