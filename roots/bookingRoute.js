const express=require('express');
const mongoose = require('mongoose')
const router=express.Router();
const Booking=mongoose.model('booking');
const Room=mongoose.model('rooms');

router.post('/bookroom',async(req,res)=>{
  const {
    room,
    user,
    fromdate,
    todate,
    totalamount,
    totaldate,
  }
  = req.body;
  console.log(fromdate);

  try{
    const newbooking=new Booking({
   room:room.name,
  roomid:room._id,
  userid:user._id,
  fromdate,
  todate,
  totalamount,
  totaldate,
  transactionId:"1234"



      })
     

   const booking=await newbooking.save();

   const roomtemp=await Room.findOne({_id:room._id});
   roomtemp.currentbookings.push(

    {bookingid:booking._id,
    fromdate:fromdate,
  todate:todate,
userid:user._id,
status:booking.status});

await roomtemp.save();




   

   res.send("Booked");
 
 

   //
  }
  catch(errr){
      console.log(errr)
      return res.status(400).json({message: errr});
  }


});


router.post("/getbookingsbyuserid",async(req,res)=>{
const userid=req.body.userid;

try{
  const bookings=await Booking.find({userid:userid})
  console.log(bookings)
  res.send(bookings);
}
catch(err){
  return res.status(400).json({message: err})

}

})




router.post("/cancelbooking",async(req,res)=>{

const{bookingid,roomid}=req.body


 try{

  const booking_id=await Booking.findOne({_id:bookingid})
  booking_id.status="cancelled"
  await booking_id.save();
  const room= await Room.findOne({_id:roomid})
  const bookings=room.currentbookings
  const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
  room.currentbookings=temp;

  await room.save();

  res.send("Booking cancelled")


 }
 catch(err){

  return res.status(400).json({message: err})
 }
})



router.get('/getallbookings',async(req,res)=>{
  
 try{

  const bookings=await Booking.find({})
  console.log("here"+bookings)
  return res.json(bookings)
 }
 catch(err){
   console.log(err)
   return  res.status(400).json({message:err})
 }


})

module.exports=router;