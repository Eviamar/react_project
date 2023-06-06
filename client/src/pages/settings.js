import React,{useState,useEffect} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table, CardGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';

const Settings = props => {
    const baseUrl = 'http://localhost:3001/api';
    const [userData,setUserData] = useState();
    let user = JSON.parse(localStorage.getItem("user"));
    const [isEditable,setIsEditable] = useState(false);

    const[avatar,setAvatar] = useState("");
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[mobile,setMobile] = useState("");
    const[email,setEmail] = useState("");
    const[oldPassword,setOldPassword] = useState("");
    const[newPassword,setNewPassword] = useState("");
    const[confirmNewPassword,setConfirmNewPassword] = useState("");

    const updateUser = async()=>{
       
             const response = await fetch(baseUrl+"/account/updateUser/"+user._id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                //password:newPassword
          })});
          const data = await response.json(); 
          user = JSON.parse(localStorage.getItem("user"));
          loadUserData(user._id);
          toast.success("changed")
        setIsEditable(false);
        
      }

    const loadUserData = async(gid)=>
    {
      const response = await fetch(baseUrl+"/account/readUserByID/"+gid,{method:'GET'});
      const data = await response.json();
      setUserData(data.message);
      console.log("LoadUserData===>"+JSON.stringify(userData));
      
    //   setFirstName(userData.firstName);
    //   setLastName(userData.lastName);
    //   setEmail(userData.email);
    //   setMobile(userData.mobile);
    }

    useEffect(()=>{
        loadUserData(user._id);
      },userData,user);

    return (
        <>
        <Header/>
       
        <Container style={{alignSelf:'center',width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:12,paddingBottom:5,paddingTop:5}}>
<p>{JSON.stringify(user)}</p>
{userData !=null && (
<>

{
          isEditable ? 
          (
            <>
            <Card style={{ margin:10,}}>
            <Row>
          <Col xl={2} >
        <Card.Img variant="top" src={userData.avatar}/>
        <Form.Control type="file" accept="image/*" name="gameImageCover" onChange={(e)=>{setAvatar(e)}} />
        </Col>
        <Col xl={9}>
        <Card.Body >

            <Row>

            <Col xl={3}>
         <Form.Control type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder='First name' style={{marginTop:10}}/>
          <Form.Control type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder='Last name' style={{marginTop:10}}/>
          <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' style={{marginTop:10}}/>
          <Form.Control type="phone" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} placeholder='Mobile' style={{marginTop:10}}/>
          </Col>

          <Col xl={3}>
          <Form.Control type="phone" value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} placeholder='Old password' style={{marginTop:10}}/>
          <Form.Control type="phone" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} placeholder='New password' style={{marginTop:10}}/>
          <Form.Control type="phone" value={confirmNewPassword} onChange={(e)=>{setConfirmNewPassword(e.target.value)}} placeholder='Confirm password' style={{marginTop:10}}/>
          </Col>

          <Col xl={1}>
            <Row>
          <Button variant="primary" onClick={() => setIsEditable(!isEditable)} style={{marginBottom:'40%'}}>Back</Button>
           <Button variant="success" onClick={updateUser}>Save</Button> 
           </Row>
           </Col>

          </Row>

        </Card.Body>
        </Col>
        </Row>
      </Card>
            </>
          ) 
          : 
          ( 
                <>
                <Card style={{ margin:'2%' ,}}>
                    <Row>
                    <Col xl={2} >
       
        <Card.Img style={{}} variant="top" src={userData.avatar} />
        
        </Col>
        <Col xl={3}>
        <Card.Body >
          <Card.Title >{userData.firstName} {userData.lastName}</Card.Title>
           <p><b>Mobile:</b> {userData.mobile}</p>
          <p><b>Email:</b> {userData.email}</p>
          <Container>
            <Row>
              <Col>
          <Button variant="primary" onClick={() =>setIsEditable(!isEditable)} style={{marginRight:5}}>Edit </Button>
          </Col>
          </Row>
          </Container>
          
        </Card.Body>
        </Col>
        </Row>
      </Card>
                </>
          )
        }



</>

)}

 </Container>
      
        
      
        </>
    )
}

export default Settings;