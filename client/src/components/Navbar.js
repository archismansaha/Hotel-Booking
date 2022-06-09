import React from 'react'
import {Dropdown} from "react-bootstrap"
import {useState,useEffect} from "react"
import {Navbar,Button,Container,Nav} from "react-bootstrap"
const Navbar1 = () => {
  
    const user1= JSON.parse(localStorage.getItem('currentUser'));
    
   
 
 const[user,setuser]=useState(user1?user1.name:"");
 const logout=()=>{
  localStorage.removeItem("currentUser");
  setuser("");

 }




  return (
    

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  
 
 
          
 
 
 
    { 
      
      !user?
      <Container>
  <Navbar.Brand href="/home">Hotel-Booking</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="  right-aligned " id="responsive-navbar-nav">
     
    <Nav className="justify-content-end" style={{ width: "100%" }}>
    
      <Nav.Link className="ml-auto" href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>
      </Navbar.Collapse>
      </Container>

     

      :

      <Container>
      <Navbar.Brand href="/home">Hotel-Booking</Navbar.Brand>
  <div className="collapse navbar-collapse  d-flex flex-row-reverse p-1" id="navbarText">
  <ul className="navbar-nav  ">
  <li className="nav-item active ">
  <Dropdown >
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
</svg>{user}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#" onClick={() => logout()}>Logout</Dropdown.Item>
    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
</li>
</ul>
</div>


  </Container>

}

</Navbar>

      
    
 
  )
}

export default Navbar1