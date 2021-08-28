const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
require('../db/conn')
const jwt = require('jsonwebtoken')
const User = require("../model/schema")
const authenticate = require('../middleware/authenticate')


router.get("/",(req,res)=>{
    res.send("hello world")
});

// about ka page

router.get("/about",authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.get("/contact",(req,res)=>{
    res.send("hello contact")
});


// {++++++ USING PROMISE++++}

// router.post("/signup",(req,res)=>{
//     const {name,email,phone,work,password,cpassword}= req.body;
//     if(!name||!email||!phone||!work||!password||!cpassword){
//         return res.status(422).json({error:"plz fill right"})
//     }
   
//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"email exist"})
//         }
//         const user = new User({name,email,phone,work,password,cpassword})

//         user.save().then(()=>{
//             res.status(201).json({mass:"successful "})
//         }).catch((e)=>{
//             res.status(500).json({error:"fail register"})
//         })
//     }).catch(err=>{console.log(err)})

    
// });



// {+++++USING ASYNC ++++++}



router.post("/signUp", async (req,res)=>{
    const {name,email,phone,work,password,cpassword}= req.body;
    if(!name||!email||!phone||!work||!password||!cpassword){
        return res.status(422).json({error:"plz fill right"})
    }
   

    try {

       const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"email exist"})
        }else if(password!=cpassword){
             return res.status(422).json({error:"password not match"})
        }else{
              const user = new User({name,email,phone,work,password,cpassword})
              const userregister = await user.save()
      
              if(userregister){
              res.status(201).json({mass:"successful "})
              }else{
               res.status(500).json({error:"fail register"})
              } 
        }
                    
    }catch(err){
     console.log(err)
       }
    
});



router.post("/signin",async(req,res)=>{
    

    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({error:'bhar do yar'})
        }
        const userlogin = await User.findOne({email:email})

        if (userlogin){
        const ismatch = await bcrypt.compare(password,userlogin.password)
          

        const token = await userlogin.generateAuthToken();
         console.log(token);

         res.cookie("jwtoken",token,{
             expires:new Date(Date.now()+25692000000),
             httpOnly:true
         })

        if(!ismatch){
             res.status(400).json({error:"signin error"})
        }else{
          res.json({massage:"signin successful"})
        }
        }else{
           res.status(400).json({error:"signin error"})
        }

        
        
    }catch(e){
        console.log("problem signin")
    }
});



module.exports = router;