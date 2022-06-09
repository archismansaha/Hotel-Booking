
import React,{useState,useEffect} from 'react';
import axios from 'axios';

import { useParams } from "react-router-dom";
import {Spinner} from "react-bootstrap"
import Error from "../components/Error"
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'



const Bookingscreen = ({props}) => {
const { roomid,fromdate,todate } = useParams();
const[room,setroom] =useState([]);
const[loading,setloading] =useState(true);
const[error,seterror] =useState();

const momentfromdate=moment(fromdate,'DD-MM-YYYY');
const momenttodate=moment(todate,'DD-MM-YYYY');




 const fetchdata=async () =>{
  
    try{
      setloading(true);
  
     const data1 =( await axios.post('/api/rooms/getroombyid',{roomid:roomid})).data;
    
    setroom(data1);
    setloading(false);
     
    //console.log(rooms);
  
  
    }
    catch (err){
      seterror(true);
        console.log(err);
        setloading(false);
    }
   }

   useEffect( () =>{
    if(!localStorage.getItem('currentUser')){ 
      window.location.href='/login'
    }
    fetchdata();
  
   },[]);
  

   const totaldate=moment.duration(momenttodate.diff(momentfromdate)).asDays()+1;
   const totalamount=totaldate*room.rentperday;


 /*const bookroom=async () =>{
 
    const bookingDetails={
    room,
    user:JSON.parse(localStorage.getItem('currentUser')),
    fromdate,
    todate,
    totalamount,
    totaldate,
  }
  
  /*for (var i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) +  localStorage.getItem(localStorage.key(i)) );
}
  try{
    
    const result=(await axios.post('/api/booking/bookroom',bookingDetails)).data;
    console.log(result)

   
  }catch(err){

    console.log(err);
  }




 }*/






 const onToken=async(token)=>{
  const bookingDetails={
    room,
    user:JSON.parse(localStorage.getItem('currentUser')),
    fromdate,
    todate,
    totalamount,
    totaldate,
    token
  }
  
  /*for (var i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) +  localStorage.getItem(localStorage.key(i)) );
}*/
  try{
    setloading(true);
    const result=(await axios.post('/api/booking/bookroom',bookingDetails)).data;
    setloading(false);
    Swal.fire('Congratulations!',"Your room booked Successfully",'success').then(result=>{
      window.location.href='/profile'

    })

   
  }catch(err){
    setloading(false);
    console.log(err);
    Swal.fire('Oops!',"Something went wrong",'error')
  }

   console.log(token);


 }




















 return (
      <div className="m-5"  data-aos="flip-left">
      <div className="row justify-content-center mt-5 bs">
      {loading ?(<Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
       </Spinner>)
      : room ?
    <div>
      
      <div className="row">
      
      
        <div className="col-md-7">
        <h1>{room.name}</h1>
        <img src={room.imageurls[0]} className="bigimg img-fluid" alt="{room.name}"/>
        </div>
        <div className="col-md-5">
        
        <div style={{textAlign:'right'}}>
        <h1>Booking Details</h1>
        </div>
         <hr/>
         <div style={{textAlign:'right'}}>
         <b>
          <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
          <p>From Date: {fromdate}</p>
          <p>To Date: {todate}</p>
          <p>Max Count: {room.maxcount}</p>
      </b>
     </div>
     
     <div style={{textAlign:'right'}}>
      <h1>Amount</h1>
      <hr/>
      <p>Total Days: {totaldate}</p>
      <p>Total Amount: {totalamount}</p>
     
     
     
     </div>


    <div style={{float:'right'}}>
     
     <StripeCheckout
    
     currency="INR"
     amount={totalamount*100}
    
        token={onToken}
        stripeKey="pk_test_51L7wdOSIKvy3P7jd8VJKnO4UIc2mP8RONHDApZuJMYcbj3CtUPnvQIbRfrPniKvLN7VqVujBhTsIIY0FbwV2tkOe003L2wYAOI"
      >
      <button  className="btn btn-primary" >Pay Now</button>
      </StripeCheckout>
    
    </div>



      </div>
      
      
      
      
      
      </div>
      
      
      
      </div>
      :
  <Error />
       
      }</div>

  

      </div>
      
    );
  


 }
 

export default Bookingscreen;