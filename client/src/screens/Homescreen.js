
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from "../components/Room"
import { Spinner } from "react-bootstrap"

import Loader from "../components/Loader"
import Error from "../components/Error"
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.min.css'

const { RangePicker } = DatePicker;




const Homescreen = () => {

  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [filterroom, setfilterroom] = useState([]);
  const [searchkey, setsearchkey] = useState('');
  const [type, settype]=useState("all");
  const fetchdata = async () => {

    try {
      setloading(true);


      const data1 = (await axios.get('/api/rooms/getallrooms')).data;

      setrooms(data1);
      setfilterroom(data1);
      setloading(false);

      //console.log(rooms);


    }
    catch (err) {
      seterror(true);
      console.log(err);
      setloading(false);
    }
  }

  useEffect(() => {

    fetchdata();

  }, []);


  const filterByDate = (dates) => {

    
 
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
    settodate(moment(dates[1]).format('DD-MM-YYYY'))
    
    var temprooms = [];
    var availability = false;

    console.log(moment(fromdate))


    
   


    for (const room of filterroom) {
      


      if (room.currentbookings.length > 0) {

        for (const booking of room.currentbookings) {
         
          if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) &&
            !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)) {
           

            if (

              (moment(dates[0]).format('DD-MM-YYYY')) !== booking.fromdate &&
              (moment(dates[1]).format('DD-MM-YYYY')) !== booking.todate &&
              (moment(dates[0]).format('DD-MM-YYYY')) !== booking.todate &&
              (moment(dates[1]).format('DD-MM-YYYY')) !== booking.fromdate

            ) {


              availability = true;

            }

          }


        }


      }
     
      if (availability == true || room.currentbookings.length == 0) {
        //console.log(room);
        temprooms.push(room);


      }
     
      setrooms(temprooms);


    }
  
  
    //console.log(rooms);
  }


  const    filterBySearch=()=>{
    setloading(true);
    const temprooms= filterroom.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setloading(false);
    setrooms(temprooms);

  }

 const filterByType=(e)=>{
   settype(e)
   if(e!='all'){
    setloading(true);
    const temprooms= filterroom.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setloading(false);
    setrooms(temprooms);

   }
   else {
  
  setrooms(filterroom);
   }
    
 }




















  return (
    <div className="container">

      <div className="row mt-5 bs">

        <div className="col-md-3">

          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

        </div>
  <div className="col-md-6 ">
  
   <input type="text" className="form-control" placeholder="search-rooms"
   value={searchkey} onChange={(e)=>{
     setsearchkey(e.target.value)
   }}
   onKeyUp={
     filterBySearch
   }/>
  </div>

  <div className="col-md-3 " value={type} onChange={(e)=>{filterByType(e.target.value)}}>
  <select className="form-control">
   <option value="all">All</option>
   <option value="delux">Delux</option>
   <option value="non-delux">Non Delux</option>
  </select>
  </div>
      </div>








      <div className="row justify-content-center mt-5">
        {loading ? <Loader />
          : 
            (rooms.map((room) => (

              <div className="col-md-9 mt-2"  data-aos="fade-up" key={room._id}>

                <Room room={room} fromdate={fromdate} todate={todate} />

              </div>
            )))
            

            


        }



    </div>
</div>

  );



}



export default Homescreen;