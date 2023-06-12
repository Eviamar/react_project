import React,{useState,useEffect} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table, CardGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import axios from 'axios';
import GameCard from '../components/GameCard';

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

    const preset_key = 'irkdzxu3';
    const cloud_name ='doaxabeif';

    const uploadUserImage = async(e)=>{
      const file = e.target.files[0];
      console.log(file)
      const formData = new FormData();
      formData.append('folder',"avatars/"+user._id);
        formData.append('file',file);
        formData.append('upload_preset',preset_key);
        await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,formData)
      .then(async results =>
      {
        toast.success(`image cover successfully`)
        setAvatar(results.data.secure_url);
       // console.log(`user Cover ===> ${avatar}`);
        
        
      })
      .catch(error=>
      {
        toast.error(error.message);
      })
    }

    const updateUserImage = async()=>{
   try{
    const response = await fetch(baseUrl+"/account/updateUserImage/"+user._id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      avatar: avatar,
})});
const data = await response.json(); 
//user = JSON.parse(localStorage.getItem("user"));
loadUserData(user._id);
toast.success("changed")
setIsEditable(false);
   }catch(error){
    console.log(error)
   }
    
 
}
    const updateUser = async()=>{  
 try{
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
 }catch(error){
  console.log(error)
 }       
      }

    const loadUserData = async(gid)=>
    {
      try{
        const response = await fetch(baseUrl+"/account/readUserByID/"+gid,{method:'GET'});
        const data = await response.json();
        setUserData(data.message);
        //console.log("LoadUserData===>"+JSON.stringify(userData));
        
      //   setFirstName(userData.firstName);
      //   setLastName(userData.lastName);
      //   setEmail(userData.email);
      //   setMobile(userData.mobile);
      }catch(error){
       console.log(error)
      }
      
    }

    useEffect(()=>{
        loadUserData(user._id);
        
      },userData,user);

    return (
        <>
        <Header/>
       <ToastContainer/>
        <Container style={{alignSelf:'center',width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:12,paddingBottom:5,paddingTop:5}}>
<h1>Your account Info</h1>
{userData !=null && (
<>

{
          isEditable ? 
          (
            <>
            <Card style={{ margin:10,}}>
            <Row>
          <Col xl={2} >
        <Card.Img style={{width:150,height:150,borderTopRightRadius:0,borderBottomLeftRadius:0}}  src={userData.avatar}/>
        <label>Choose new avatar</label>
        <Form.Control type="file" accept="image/*" name="gameImageCover" onChange={(e)=>{uploadUserImage(e)}} />
        <Button variant="success" style={{marginTop:10}} onClick={updateUserImage}>✔Save avatar✔</Button> 
        </Col>
        <Col xl={9}>
        <Card.Body >

            <Row>

            <Col xl={3}>
         <Form.Control type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder='First name' style={{marginTop:10}}/>
          <Form.Control type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder='Last name' style={{marginTop:10}}/>
          <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' style={{marginTop:10}}/>
          <Form.Control type="phone" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} placeholder='Mobile' style={{marginTop:10}}/>
          <Button variant="primary" onClick={() => setIsEditable(!isEditable)} style={{marginTop:10}}>✔Save info✔</Button>
          </Col>
          {/* <Col xl={2}>
            <Row>
          
           
           </Row>
           </Col> */}
          <Col xl={3}>
          <Form.Control type="phone" value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} placeholder='Old password' style={{marginTop:10}}/>
          <Form.Control type="phone" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} placeholder='New password' style={{marginTop:10}}/>
          <Form.Control type="phone" value={confirmNewPassword} onChange={(e)=>{setConfirmNewPassword(e.target.value)}} placeholder='Confirm password' style={{marginTop:10}}/>
          <Button variant='danger' style={{marginTop:10}}>Update Password</Button>
          </Col>
          </Row>

        </Card.Body>
        
        </Col>
        
        </Row>
      </Card>
      <Row style={{justifyContent:'center'}}>
      <Button variant="primary" onClick={() => setIsEditable(!isEditable)} style={{width:'15%'}}>🡰</Button>
      </Row>
       
            </>
          ) 
          : 
          ( 
                <>
                <Card style={{ margin:'2%' ,}}>
                    <Row>
                    <Col xl={2} >
       
                    <Card.Img style={{width:150,height:150,borderTopRightRadius:0,borderBottomLeftRadius:0}}  src={userData.avatar}/>
        
        </Col>
        <Col xl={3}>
        <Card.Body >
          <Card.Title >{userData.firstName} {userData.lastName}</Card.Title>
           <p><b>Mobile:</b> {userData.mobile}</p>
          <p><b>Email:</b> {userData.email}</p>
          <Button variant="primary" onClick={() =>setIsEditable(!isEditable)} style={{marginRight:5}}>Edit </Button>
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
 <Container style={{width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:12,paddingBottom:10,paddingTop:5}}>

      <h3 style={{textAlign:'center'}}>Game Collection</h3><br/>
      <Row>
            {
             userData && userData.gamesCollection.length > 0 ? (userData.gamesCollection.map((item)=><Col xl={3} style={{marginBottom:10}}><GameCard game={item}/></Col>)) : (<>No games</>)
            } 
      </Row>
      </Container>
        
      
        </>
    )
}

export default Settings;