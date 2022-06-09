import { Tabs } from "antd";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Tag } from "antd";

import Loader from "../components/Loader";

const { TabPane } = Tabs;
const Adminscreen = () => {




useEffect(()=>{

if(JSON.parse(localStorage.getItem('currentUser')).isAdmin==false){
    window.location.href='/home'
}


},[])

    






  return (
    <div className="mt-3 ml-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          
            <Bookings />
          
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms/>
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <h1><Addroom/></h1>
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const fetchdata = async () => {
    try {
      setloading(true);
      const data1 = (await axios.get("/api/booking/getallbookings")).data;
      console.log(data1);
      setloading(false);
      setbookings(data1);
    } catch (err) {
      console.log(err);

      setloading(false);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>

        {loading && <Loader />}

        <table className="table table-dark table-striped table-hover">
          <thead className="bs thead-dark">
            <tr>
              <th scope="col">Booking Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Room</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr className="table-info table-active">
                    <th scope="row">{booking._id}</th>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}




















export function Rooms() {
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
  
    const fetchdata = async () => {
      try {
        setloading(true);
        const data1 = (await axios.get("/api/rooms/getallrooms")).data;
        console.log(data1);
        setloading(false);
        setrooms(data1);
      } catch (err) {
        console.log(err);
  
        setloading(false);
        Swal.fire("Oops!", "Something went wrong", "error");
      }
    };
  
    useEffect(() => {
      fetchdata();
    }, []);
  
    return (
      <div className="row">
        <div className="col-md-10">
          <h1>Rooms</h1>
  
          {loading && <Loader />}
  
          <table className="table table-dark table-striped table-hover">
            <thead className="bs thead-dark">
              <tr>
                <th scope="col">Room Id</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Rentperday</th>
                <th scope="col">Maxcount</th>
                <th scope="col">Phone Number</th>
              </tr>
            </thead>
  
            <tbody>
              {rooms.length &&
                rooms.map((room) => {
                  return (
                    <tr className="table-info table-active">
                      
                      <td>{room._id}</td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.rentperday}</td>
                      <td>{room.maxcount}</td>
                      <td>{room.phonenumber}</td>
                      
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }





















  export function Users() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
  
    const fetchdata = async () => {
      try {
        setloading(true);
        const data1 = (await axios.get("/api/users/getallusers")).data;
        console.log(data1);
        setloading(false);
        setusers(data1);
      } catch (err) {
        console.log(err);
  
        setloading(false);
        Swal.fire("Oops!", "Something went wrong", "error");
      }
    };
  
    useEffect(() => {
      fetchdata();
    }, []);
  
    return (
      <div className="row">
        <div className="col-md-10">
          <h1>Users</h1>
  
          {loading && <Loader />}
  
          <table className="table table-dark table-striped table-hover">
            <thead className="bs thead-dark">
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">IsAdmin</th>
                
              </tr>
            </thead>
  
            <tbody>
              {users.length &&
                users.map((user) => {
                  return (
                    <tr className="table-info table-active">
                      
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin?'YES': 'NO'}</td>
                      
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  


















export function Addroom(){



 const [name,setname]=useState('')
 const[rentperday, setrentperday]= useState('')
 const[description, setdescription]=useState('')
 const[maxcount, setmaxcount]=useState('')
 const[phonenumber, setphonenumber]= useState('')
 const[type, settype]= useState('')
 const[imageurl1,setimageurl1]=useState('')
 
 const[imageurl2,setimageurl2]=useState('')
 
 const[imageurl3,setimageurl3]=useState('')




const Addroom =async()=>{




  const newroom={

name,
rentperday,
maxcount,
description,
phonenumber,
type,
imageurls:[imageurl1,imageurl2,imageurl3]

  }

  try{

    const result=await(await axios.post('/api/rooms/addroom',newroom)).data
    console.log(result)
    Swal.fire('Congrats',"Room added successfully","success").then(result=>{
      window.location.reload()
    })
   
  }
  catch (err){

    console.log(err);
  
   
    Swal.fire("Oops!", "Something went wrong", "error");
  }




}


 return (
  <div className="row">
  
  
  
   <div className="col-md-5">
   
   
   
   <input type="text" className="form-control mt-2" placeholder="room name"
   
   value={name} onChange={(e)=>{setname(e.target.value)}}
   
   />
   
    <input type="number" className="form-control mt-2" placeholder="rent per day"
    value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}
    />
    
    <input type="number" className="form-control mt-2" placeholder="max count" 
    value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}  />
    
    
    <input type="text" className="form-control mt-2" placeholder="description"
    value={description} onChange={(e)=>{setdescription(e.target.value)}}

    
    />
    <input type="number" className="form-control mt-2" placeholder="phone number" 
    
    value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}
    
    
    
    
    />
   
   
   
</div>
<div className="col-md-5">
   
   
   
<input type="text" className="form-control mt-2" placeholder="type" 

value={type} onChange={(e)=>{settype(e.target.value)}}

/>

 <input type="text" className="form-control mt-2" placeholder="Image URL 1" 
 
 value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
 
 />
 <input type="text" className="form-control mt-2" placeholder="Image URL 2" 
 
 value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
 />
 <input type="text" className="form-control mt-2" placeholder="Image URL 3" 
 
 value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}
 
 />
 <div className="text-right">
 
 
 <div className="btn btn-primary mt-2" onClick={()=>{Addroom()}}>Add Room</div>
 
 
 
 
 </div>



</div>
  
  
  
  
  
  </div>
















 )

}

















  