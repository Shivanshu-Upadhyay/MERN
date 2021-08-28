const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userschema=new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type:String,
         required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },
    tokens:[{
        token:{
              type: String,
              required:true
        }
    }]

})




// PASSWORD HASING
userschema.pre('save',async function(next){
    console.log("hii from hasing")
    if(this.isModified('password')){
        
        this.password =  await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
})

 userschema.methods.generateAuthToken = async function(){
       try{
         let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
         this.tokens = this.tokens.concat({token:token})
         await this.save();
         return token;
       }catch{
           console.log("token error")
       }
 }





const User = mongoose.model("user",userschema);
module.exports = User;