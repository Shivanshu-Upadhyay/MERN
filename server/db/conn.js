const mongoose = require('mongoose')

const db = process.env.DATABASE;

mongoose.connect(db,{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log('no connextion')
})