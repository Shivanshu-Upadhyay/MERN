const express = require("express");
const dotenv  = require('dotenv')
const app = express();
const port = process.env.PORT || 8000;
dotenv.config({path:"./config.env"})
require('./db/conn');
// const User = require('./model/schema')

app.use(express.json());


app.use(require('./router/auth'));

//   MIDDELWARE


const middelware = (req,res,next)=>{

    console.log("hello middelware")
    next();
} 


app.listen(port,()=>{
    console.log(`port running ${port}`)
})