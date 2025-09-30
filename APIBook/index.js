const express=require('express');
require('dotenv').config();
const app=express();
const cors=require('cors')
const connectDB=require('./connection');
const book=require('./routes/book');
const mobile=require('./routes/mobile');
const discount=require('./routes/discount');
const { connectCloudinary } = require('./Config/cloudanry');
connectDB();
connectCloudinary();
const port=process.env.PORT;
app.use(cors());
app.use("/book",book);
app.use("/mobile",mobile);
app.use('/discount',discount);

app.listen(port,()=>{
   try {
    console.log("Server is running on port 3000");
   } catch (error) {
    console.log(error);
   }
})