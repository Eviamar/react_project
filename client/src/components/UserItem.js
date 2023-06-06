import React, { useState } from 'react';
import {Button,Container,Row,Col,Form,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';





const GameItem = props =>{
  const baseUrl = 'http://localhost:3001/api';
  const [isEditable,setIsEditable] = useState(false);

    return(
       <Card style={{marginLeft:2}}> 
        <Card.Body>
        <Container>
        <Card.Title style={{textAlign:'center'}}>{props.user.firstName} {props.user.lastName}</Card.Title> 
          <Card.Img variant="top" src={props.user.avatar}></Card.Img>
        <Card.Text>{props.user._id}</Card.Text>
        <Card.Text>Admin: {props.user.isAdmin ? (<>yes</>):(<>no</>)}</Card.Text>
        <Card.Text>Activated: {props.user.isVerified ? (<>yes</>):(<>no</>)}</Card.Text>
        <Card.Text>Email: {props.user.email}</Card.Text>
        <Card.Text>Phone: {props.user.mobile}</Card.Text>
        
        {
          props.user.gamesCollection.length >0 ? (<>there are items</>) :(<>user is poor and has no games</>)
        }
          </Container>
        </Card.Body>
        </Card>
        
    )
}

export default GameItem;