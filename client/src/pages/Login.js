import React,{useState} from "react";
import {Button,Container,Row,Col,Form, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import logo from '../logo.png';


import axios from 'axios';
import {useNavigate} from 'react-router-dom'

// const user = {
//   email:'',
//   password:'',
//   firstName:'',
//   lastName:'',
//   mobile:'',
// } // use this instead of all the useStates for user


const Login = props => {
    const navigate = useNavigate(); 
    const baseUrl = 'http://localhost:3001/api';
    const [email,setEmail] = useState("eviamar26@gmail.com");
    const [password,setPassword] = useState("12345678");
    const [passwordConfirmation,setPasswordConfirmation] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [mobile,setMobile] = useState("");
    const [authView,setAuthView] = useState("loginView"); // registerView //verifyView //recoverView
    const [code,setCode] = useState("");
    

    //const [userData,setUserData] = useState(user);


  

    const getCode=async()=>{
      const user = 
      {
        email:email,
      }
      axios.put(baseUrl+"/account/getNewCode",{user})
            .then(results =>{
              toast.success(`Your code: ${results.data.message}`);
            })
            .catch(error =>{
              toast.error(error.message);
            })

    }
    const changePassword = async()=>{
      
      if(code.length!=4 || code==null || code=="null"){
        toast.error("code is invalid")
        return;
      }
      if(password.length>=8&&passwordConfirmation.length>=8)
      if(password===passwordConfirmation)
      {
        const codeint = parseInt(code);
        const verify = 
        {
          email:email,
          verificationCode: codeint,
          password:passwordConfirmation
        }
        axios.put(baseUrl+"/account/updatePassword",{verify})
        .then(result=>{
          toast.success(result.data.message);
        })
        .catch(error=>{
          toast.error(error.data.message);
        })
      }
      else
      toast.error("passwords not match")
      else
      toast.error("password is too short!\n8 digits at least")
     
      
    }
    const verifyMe = async()=>
    {
      if(code!="")
      {
       // const userInfo = JSON.parse(localStorage.getItem('vdata'));
        const codeint = parseInt(code);
        const verify = 
        {
          email:email,
          verificationCode: codeint
        }
        axios.put(baseUrl+"/account/verifyAccount",{verify})
        .then(result=>{
          toast.success(result.data.message);
          setAuthView("loginView")
        })
        .catch(error=>{
          toast.error(error.message);
        })
      }
      else{
        toast.message("please type verification code")
      }
    }
    const createNewAccount = async()=>{
    if(email!="" && password.length>=8 && firstName!="" && lastName!="" && mobile.length==10)
    {
        const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          mobile: mobile
        }

        axios.post(baseUrl+"/account/createAccount",{user})
        .then(results=>{
          toast.success(results.data.message.verificationCode);
          localStorage.setItem('vdata',JSON.stringify(results.data.message));
          setAuthView("verifyView");
        })
        .catch(error =>{
          toast.error(error.message);
        })
    }
    else
    {
      if(password.length<8) toast.error("password length must be 8 letters or above")
      else if(mobile.length!=10) toast.error("phone length must be 10 digits")
      else toast.error("All fields are required")
    }
    }

    const loginfunc = async()=>{
      localStorage.clear();
        if(email!=="" && password!=="")
        {
            const user = 
            {
              email: email,
              password: password
            }
            axios.post(baseUrl+"/account/login",{user})
            .then(results =>{
              toast.success(`Welcome ${results.data.message}`);
              localStorage.setItem("user",JSON.stringify(results.data.message));
              //console.log(results.data.message);
              navigate('/dashboard');
              
            
            })
            .catch(error =>{
              toast.error(error.message);
            })
        }
        else
        {
           toast.error("All fields are required")
        }
      }

     

    return (
        <>
            <Container >
                <ToastContainer/>
                <Row>
                    <Col xl={4}></Col>
                    <Col xl={4} style={{background:'rgba(155,155,155,0.96)',borderRadius:20,padding:50,marginTop:100,textAlign:'center'}}>
                        <img src={logo} alt="logo" style={{width:200}}/>
                        {
                              authView === 'loginView' ? (<>
                              <Form>
                                <Form.Label><h3>Login</h3></Form.Label>
                                <Form.Group>
                                    <Form.Control type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Type your password"style={{marginTop:10}}/>
                                </Form.Group>
                                <Button variant="primary" onClick={loginfunc} style={{marginTop:12,width:'45%',marginRight:'10%'}}>Sign in</Button>
                                <Button variant="primary" onClick={()=> setAuthView("registerView")} style={{marginTop:12,width:'45%'}}>Register</Button>
                                
                                <Button variant="btn btn-link" onClick={()=> setAuthView("recoverView")} style={{marginTop:12,width:'45%',marginRight:'10%',color:"#000"}}>Forgot password?</Button>
                                <Button variant="btn btn-link" onClick={()=> setAuthView("verifyView")} style={{marginTop:12,width:'45%',color:"#000"}}>Verify account</Button>
                                
                                
                            </Form>
                              </>) 
                            : authView === 'registerView' ? (<>
                            <Form>
                                 <Form.Label><h3>Register</h3></Form.Label>
                                <Form.Group>
                                <Form.Control type="text" name="firstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder='First name' style={{marginTop:10}}/>
                                </Form.Group>
                                <Form.Group>
                                <Form.Control type="text" name="lastName" value={lastName} onChange={(e)=>{setlastName(e.target.value)}} placeholder='Last name' style={{marginTop:10}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email" style={{marginTop:10}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Type your password" style={{marginTop:10}}/>
                            </Form.Group>
                            <Form.Group>
                            <Form.Control type="phone"  name="mobile" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} placeholder='Mobile' style={{marginTop:10}}/>
                            </Form.Group>
                            
                            <Button variant="primary" onClick={createNewAccount}  style={{marginTop:12,width:'45%',marginRight:'10%'}}>Submit</Button>
                            <Button variant="primary" onClick={()=>setAuthView("loginView")} style={{marginTop:12,width:'45%'}}>Back</Button>
                              </Form>
                            </>)
                            : authView === 'verifyView' ? (<>
                                <Form>
                                  <Form.Label><h3>Verify</h3></Form.Label>
                                  <Form.Group>
                                    <Form.Control type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="number" name="code" value={code} onChange={(e)=> setCode(e.target.value)} placeholder="Type your code"style={{marginTop:10}} />
                                </Form.Group>
                                <Button variant="primary" onClick={verifyMe} style={{marginTop:12,width:'45%',marginRight:'10%'}}>Verify</Button>
                                <Button variant="primary" onClick={()=>setAuthView("loginView")} style={{marginTop:12,width:'45%'}}>Back</Button>
                                 </Form>
                            </>)
                            :  (<>
                             <Form>
                                 <Form.Label><h3>Recover</h3></Form.Label>
                                 <Form.Group>
                                    <Form.Control type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group >
                                  <Row >

                                 
                                    <Form.Control type="number" name="code" value={code} onChange={(e)=> setCode(e.target.value)} placeholder="Type your code" style={{marginTop:10,width:'40%'}} />
                                    <Button variant="btn btn-link" onClick={getCode} style={{width:'40%'}}>Get Code</Button>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Type your new password"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)} placeholder="Confirm password"style={{marginTop:10}} />
                                </Form.Group>
                                 <Button variant="primary" onClick={changePassword} style={{marginTop:12,width:'45%',marginRight:'10%'}}>Confirm</Button>
                                 <Button variant="primary" onClick={()=>setAuthView("loginView")} style={{marginTop:12,width:'45%'}}>Back</Button>
                                 </Form>
                            </>) 
                        }
                    </Col>
                    <Col xl={4}></Col>
                </Row>
            </Container>
        
        </>
    )
}

export default Login;