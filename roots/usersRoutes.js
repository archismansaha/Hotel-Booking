const express=require('express');
const mongoose = require('mongoose')
const router=express.Router();
const User= mongoose.model('user')


router.post('/register',async(req, res)=>{

  const newUser=new User(req.body);

  try{
      const user=await newUser.save()
      res.send("registered")
  }
  catch(err){
    console.log(errr);
    return res.status(400).json({message: errr});
  }

});


router.post('/login',async(req, res)=>{

    const {email,password}=req.body;
    
  
    try{
        const user=await User.findOne({email: email,password: password});
        if(user){

          const temp={
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin,
           _id:user._id,


          }
          console.log(temp);
        res.send(temp);}
        else{
            return  res.status(400).json({message: "Login  failed"});
        }
    }
    catch(err){
      console.log(errr);
      return res.status(400).json({message: errr})
    }
  
  });






router.get('/getallusers',async(req,res)=>{


  try{
        
    const users=await User.find({});
    return res.json(users);
 
     //
    }
    catch(errr){
        console.log(errr)
        return res.status(400).json({message: errr});
    }

})


  module.exports=router;