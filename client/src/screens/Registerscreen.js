import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Registerscreen = () => {

  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const[cpassword,setcpassword]=useState('')



 const register = async ()=>{
   
 if(password === cpassword){
  const user={
    name,
    email,
    password
   
  }
   try{
     const result=(await axios.post('/api/users/register',user)).data;
     window.location.href='/home';
   }
   catch(err){
    //console.log(err);
    

   }
 
  }

 else{
   
  
   alert("Passowrd should match");
   

 }

 }








  return (
    <div>
    
    <div className="row justify-content-center mt-5">

      <div className="col-md-5">
      
       <div className="bs">
       
       
       
         <h2> Register</h2>
         
         <input type="text" className="form-control" placeholder="name" 
         value={name}
         onChange={(e) => {setname(e.target.value)}}/>


         <input type="email" className="form-control" placeholder="email"
         value={email}
         onChange={(e) => {setemail(e.target.value)}}/>

         <input type="password" className="form-control" placeholder="password"
         value={password}
         onChange={(e) => {setpassword(e.target.value)}}/>

         <input type="password" className="form-control" placeholder="confirm password"
         value={cpassword}
         onChange={(e) => {setcpassword(e.target.value)}}/>
         
         <button className="btn btn-primary mt-2" onClick={register}>Register</button>
       
       
       
       </div>
      
      
      
      </div>


    </div>
    
    
    </div>
  )
}

export default Registerscreen