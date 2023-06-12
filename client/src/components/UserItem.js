import React, { useState } from 'react';
import {Button,Container,Row,Col,Form,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';





const UserItem = props =>{
  const baseUrl = 'http://localhost:3001/api';
  const [isEditable,setIsEditable] = useState(false);
  

    return(
       <Card style={{marginLeft:2}}> 
        <Card.Body>
        <Container>
        <Card.Title style={{textAlign:'center'}}>{props.user.firstName} {props.user.lastName}</Card.Title> 
          <Card.Img variant="top" src={props.user.avatar} style={{width:150,height:150}}></Card.Img>
        <Card.Text>{props.user._id}</Card.Text>
        <Card.Text>Admin: {props.user.isAdmin ? (<>yes</>):(<>no</>)}</Card.Text>
        <Card.Text>Activated: {props.user.isVerified ? (<>yes</>):(<>no</>)}</Card.Text>
        <Card.Text>Email: {props.user.email}</Card.Text>
        <Card.Text>Phone: {props.user.mobile}</Card.Text>
        
        {/* {
          props.user.gamesCollection.length > 0 ? (<>there are items</>) :(<>user is poor and has no games</>)
        } */}
          </Container>
          <Row style={{justifyContent:'space-evenly',marginTop:10}}>
          <Button variant='dark' style={{width:'30%'}}>📝</Button>{props.user.isAdmin ? (<Button disabled style={{width:'30%'}} variant='danger'>✘</Button>):(<Button style={{width:'30%'}} variant='danger'>Delete</Button>)}
          </Row>
        </Card.Body>
        
        </Card>
        
    )
}

export default UserItem;