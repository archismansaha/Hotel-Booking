const express=require('express');
const mongoose = require('mongoose')
const router=express.Router();
const Room=mongoose.model('rooms');
// (backend sending data to frontend so get)
router.get('/getallrooms',async(req,res)=>{
    try{
        
    const rooms=await Room.find({});
    return res.json(rooms);
 
     //
    }
    catch(errr){
        //console.log(errr)
        return res.status(400).json({message: errr});
    }


});

// getting room id from frontend so post (frontend sending data here)
router.post('/getroombyid',async(req,res)=>{
    try{
    const roomid=req.body.roomid;
    const room=await Room.findOne({_id:roomid});
    return res.json(room);
 
     //
    }
    catch(errr){
        //console.log(errr)
        return res.status(400).json({message: errr});
    }


});



router.post('/addroom',async(req,res)=>{

    const newroom=new Room(req.body);
try{
    
    const room=await newroom.save();
  //console.log(newroom);
    res.send("Room added")
}catch(errr){
return  res.status(400).json({message:errr})
}


})













module.exports=router;