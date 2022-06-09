import React,{useState,useEffect} from 'react'
import axios from 'axios';
const Loginscreen = () => {

  
  const [email,setemail]=useState('')
  const[password,setpassword]=useState('')




 const Login = async ()=>{
   
  const user={
   
    email,
    password,
    
  }
  try{
    const result=(await axios.post('/api/users/login',user)).data;
    
    if(result){
    await localStorage.setItem('currentUser',JSON.stringify(result));

    window.location.href='/home'
    }
    else{
      console.log("NO user")
    }
  }
  catch(err){
   console.log(err);
   

  }

 
 }

   


 








  return (
    <div>
    
    <div className="row justify-content-center mt-5">

      <div className="col-md-5">
      
       <div className="bs">
       
       
       
         <h2> Login</h2>
         
        

         <input type="email" className="form-control" placeholder="email"
         value={email}
         onChange={(e) => {setemail(e.target.value)}}/>

         <input type="password" className="form-control" placeholder="password"
         value={password}
         onChange={(e) => {setpassword(e.target.value)}}/>

         
         <button className="btn btn-primary mt-2" onClick={Login}>Login</button>
       
       
       
       </div>
      
      
      
      </div>


    </div>
    
    
    </div>
  )
}

export default Loginscreen