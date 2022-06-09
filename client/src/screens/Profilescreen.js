import { Tabs } from 'antd';
import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import {Spinner} from "react-bootstrap"
import Error from "../components/Error"
import Swal from 'sweetalert2'
import { Divider, Tag } from 'antd';
const { TabPane } = Tabs;

const Profilescreen = () => {
  
   const user=JSON.parse(localStorage.getItem('currentUser'))
   useEffect(() => {

    if(!user){
        window.location.href('/login')
    }
   })
  
    return (
    <div className="mt-3 mx-4">
    <Tabs defaultActiveKey="1" >
    <TabPane tab="Profile" className="bs" key="1">
      <h1>My Profile</h1>
    <br/>

     <h1>Name:{user.name}</h1>
     <h1>Email:{user.email}</h1>
     <h1>isAdmin:{user.isAdmin?"YES":"NO"}</h1>

    </TabPane>
    <TabPane tab="Bookings" key="2">
     <MyBookings/>
    </TabPane>
   
  </Tabs></div>
  )
}

export default Profilescreen






export function MyBookings(){

    const user=JSON.parse(localStorage.getItem('currentUser'))
    const [booking,setbooking]=useState([])
    const[loading,setloading] =useState(false);
//const[error,seterror] =useState();
const fetchbooking=async ()=>{
    try{
        setloading(true);
        const rooms=  await(await axios.post('/api/booking/getbookingsbyuserid',{userid:user._id})).data;
        setbooking(rooms);
        setloading(false);
       
        
    }catch (err){
      console.log(err)
  }
}

 useEffect(() => {
 
  fetchbooking();

 },[])




 const cancelBooking=async(bookingid,roomid)=>{

 try{
   
     const results = await(await axios.post("/api/booking/cancelBooking",{bookingid,roomid})).data
     
 Swal.fire('Congrats',"Booking is Cancelled","success").then(result=>{
   window.location.reload()
 })

 }
 catch(err){
   console.log(err)
  Swal.fire('Oops!',"Something went wrong",'error')
}


 }








return(
    <div>
    <div className="row">
    
    
    <div className="col-md-6">
    
          { loading &&(<Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
           </Spinner>) }

   
      {booking &&
     ( booking.map((book)=>(
        <div className="bs " key={book._id}>

        <p >{book.room}</p>
        
        <p><b>Bookingid:</b>{book._id}</p>
        <p><b>CheckinDate:</b>{book.fromdate}</p>
        <p><b>CheckoutDate:</b>{book.todate}</p>
        <p><b>Amount:</b>{book.totalamount}</p>
       <p><b>Status:</b>{book.status=="booked"?(<Tag className="mx-2"color="green">CONFIRMED</Tag>):<Tag className="mx-2" color="red">CANCELLED</Tag>}</p>
      
        {book.status=="booked"&&(
          <div className="text-right">
      
       <button className="btn btn-primary " onClick={()=>{cancelBooking(book._id,book.roomid)}} >CANCEL BOOKING</button>

        </div>
        )}
  
   
      </div>

     

     )))}

          

     </div>



     
    
    </div>
    </div>
    
    )



}