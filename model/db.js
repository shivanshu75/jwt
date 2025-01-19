const mongoose=require('mongoose')

const connectDB=mongoose.connect(process.env.mongoURL)
module.exports=connectDB