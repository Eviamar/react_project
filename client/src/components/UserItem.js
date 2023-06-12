import React, { useState } from 'react';
import {Button,Container,Row,Col,Form,Card, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'




const UserItem = props =>{
  const baseUrl = 'http://localhost:3001/api';
  const [isEditable,setIsEditable] = useState(false);

  const [userFirstName,setUserFirstName] = useState(props.user.firstName);
  const [userLastName,setUserLastName] = useState(props.user.lastName);
  const [userIsAdmin,setUserIsAdmin] = useState(`${props.user.isAdmin}`);
  const [userIsVerified,setUserIsVerified] = useState(`${props.user.isVerified}`);
  const [userEmail,setUserEmail] = useState(props.user.email);
  const [userMobile,setUserMobile] = useState(props.user.mobile);

  
  const updateUser = async()=>{  
    try{
      
     if(userFirstName.length<2 || userLastName.length<2 || userMobile.length!==10 || userEmail==="" )
     {
       toast.error("All fields are required!\nName and lastname must be at least 2letter long\nEmail is required!\nMobile has to be 10digit")
      return;
     }
     let admin = false;
     let verified = false;
     if(userIsAdmin.toLowerCase()==="true")
          admin = true;
     if(userIsVerified.toLowerCase()==="true")
        verified=true;
     
     const response = await fetch(baseUrl+"/account/adminUpdateUser/"+props.user._id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
       firstName: userFirstName,
       lastName: userLastName,
       email: userEmail,
       mobile: userMobile,
       isAdmin: admin,
       isVerified: verified
   })});
   const data = await response.json(); 
   toast.success(`User ${props.user.firstName} updated\nID:${props.user._id}`)
   window.location.reload(false);
   setIsEditable(false);
    }catch(error){
     console.log(error)
    }       
         }
  
    return(
      <>
      <ToastContainer/>
      {
        isEditable ? (<>
       <Card style={{marginLeft:2,marginBottom:10}}> 
          <Card.Body>
          <Container>
          <Form >
            <Row style={{justifyContent:'space-evenly'}}>
          <Form.Control value={userFirstName} onChange={(e)=>setUserFirstName(e.target.value)} style={{width:'45%'}}/> <Form.Control value={userLastName}  onChange={(e)=>setUserLastName(e.target.value)}style={{width:'45%'}}/>
          </Row>
            <Card.Img variant="top" src={props.user.avatar} style={{width:'100%',height:150}}></Card.Img>
            
            <Card.Text style={{borderWidth:1  ,borderColor:'#000',borderStyle:'dashed',marginTop:5}}>User id: <text style={{fontSize:12}}>{props.user._id}</text></Card.Text>
            <FloatingLabel label="Account is admin?"><Form.Control value={userIsAdmin} onChange={(e)=>setUserIsAdmin(e.target.value)} style={{width:'100%',borderWidth:1  ,borderColor:'#000',borderStyle:'dashed'}}/></FloatingLabel>
          <FloatingLabel label="Account verified?"><Form.Control value={userIsVerified} onChange={(e)=>setUserIsVerified(e.target.value)}style={{width:'100%',borderWidth:1  ,borderColor:'#000',borderStyle:'dashed',marginTop:5}}/></FloatingLabel>
          <FloatingLabel label="Email"><Form.Control value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} style={{width:'100%',borderWidth:1  ,borderColor:'#000',borderStyle:'dashed',marginTop:5}}/></FloatingLabel>
          <FloatingLabel label="mobile"><Form.Control value={userMobile} onChange={(e)=>setUserMobile(e.target.value)} style={{width:'100%',borderWidth:1  ,borderColor:'#000',borderStyle:'dashed',marginTop:5}}/></FloatingLabel>
            </Form>
          
            </Container>
            <Row style={{justifyContent:'space-evenly',marginTop:10}}>
            <Button variant='dark' style={{width:'30%'}} onClick={()=>setIsEditable(!isEditable)}>📝</Button><Button style={{width:'30%'}} variant='success' onClick={updateUser}>✔</Button>
            </Row>
          </Card.Body>
          
          </Card>
        
        </>) : (<>
        <Card style={{marginLeft:2,marginBottom:10}}> 
          <Card.Body>
          <Container>
          <Card.Title style={{textAlign:'center'}}>{props.user.firstName} {props.user.lastName}</Card.Title> 
            <Card.Img variant="top" src={props.user.avatar} style={{width:'100%',height:150}}></Card.Img>
          <Card.Text style={{borderWidth:1  ,borderColor:'#000',borderStyle:'dashed',marginTop:5}}><h6 style={{display:'inline'}}>User id:</h6> <text style={{fontSize:12}}>{props.user._id}</text></Card.Text>
          <Card.Text style={{borderWidth:1  ,borderColor:'#000',borderStyle:'dashed',}}><h6 style={{display:'inline'}}>Admin:</h6> {props.user.isAdmin ? (<>yes</>):(<>no</>)}</Card.Text>
          <Card.Text style={{borderWidth:1  ,borderColor:'#000',borderStyle:'dashed'}}><h6 style={{display:'inline'}}>Activated:</h6> {props.user.isVerified ? (<>yes</>):(<>no</>)}</Card.Text>
          <Card.Text style={{borderWidth:1  ,borderColor:'#000',borderStyle:'dashed'}}><h6 style={{display:'inline'}}>Email:</h6> {props.user.email}</Card.Text>
          <Card.Text style={{borderWidth:1  ,borderColor:'#000',borderStyle:'dashed'}}><h6 style={{display:'inline'}}>Phone:</h6> {props.user.mobile}</Card.Text>
            </Container>
            <Row style={{justifyContent:'space-evenly',marginTop:10}}>
            <Button variant='dark' style={{width:'30%'}} onClick={()=>setIsEditable(!isEditable)}>📝</Button>{props.user.isAdmin ? (<Button disabled style={{width:'30%'}} variant='danger'>✘</Button>):(<Button style={{width:'30%'}} variant='danger'>✘</Button>)}
            </Row>
          </Card.Body>
          
          </Card></>)
      }
     </> 
       
        
    )
}

export default UserItem;