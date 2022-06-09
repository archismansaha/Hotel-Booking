import React,{useState} from 'react'
import {Modal,Button,Carousel} from 'react-bootstrap'
import {Link} from "react-router-dom"

import Loader from "./Loader" 

const Room = ({room,fromdate,todate}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
    
    <div className="col-md-4">
    
    <img src={room.imageurls[0]} className="smallimg"alt="Home"/>

    </div>
    <div className="col-md-7">
    
    
    <h1>{room.name}</h1>
    
     <p>Max Count:{room.maxcount}</p>
     <p>Phone Number:{room.phonenumber}</p>
     <p>Type:{room.type}</p>
     <div  style={{float:'right'}}>
    
     <button className="btn btn-primary" onClick={handleShow}>View Details</button></div>

    {  (fromdate && todate)&&(
     <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
     
     <button className="btn btn-primary">Book now</button>
     </Link>
  )}
    
     </div>
     <Modal
     show={show}
     size="lg"
     onHide={handleClose}
     backdrop="static"
     keyboard={false}
   >
     <Modal.Header >
       <Modal.Title>{room.name}</Modal.Title>
     </Modal.Header>
     <Modal.Body>
     <Carousel fade >
       {room.imageurls.map((imageurl)=>(
        
        <Carousel.Item key={imageurl}>
      <img
      className="d-block w-100"
      src={imageurl}
      alt="Second slide"
    />

    

    </Carousel.Item>
    

  ))}
  </Carousel>
     </Modal.Body>







     <Modal.Footer>
     <p>{room.description}</p>
       <Button variant="secondary" onClick={handleClose}>
         Close
       </Button>
       
     </Modal.Footer>
   </Modal>
    </div>

    
  )
}

export default Room