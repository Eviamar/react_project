import React,{useState} from "react";
import {Button,Container,Row,Col,Form,Card, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import {useNavigate} from 'react-router-dom'

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
        if(email!="" && password!="")
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
              console.log(results.data.message);
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

            <Container>
                <ToastContainer/>
                <Row>
                    <Col xl={4}></Col>
                    <Col xl={4} style={{background:'#bebebe',borderRadius:20,padding:50,marginTop:100,textAlign:'center'}}>
                        <img src="../../logo.png" style={{width:200}}/>
                        {
                              authView === 'loginView' ? (<>
                              <Form>
                                <Form.Label><h3>Login</h3></Form.Label>
                                <Form.Group>
                                    <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Type your password"style={{marginTop:10}}/>
                                </Form.Group>
                                <Button variant="primary" onClick={loginfunc} style={{marginTop:12,width:'100%'}}>Sign in</Button>
                                <Button variant="primary" onClick={()=> setAuthView("registerView")} style={{marginTop:12,width:'100%'}}>Register</Button>
                                <Button variant="primary" onClick={()=> setAuthView("recoverView")} style={{marginTop:12,width:'100%'}}>Forgot password?</Button>
                                <Button variant="primary" onClick={()=> setAuthView("verifyView")} style={{marginTop:12,width:'100%'}}>Verify account</Button>
                                
                            </Form>
                              </>) 
                            : authView === 'registerView' ? (<>
                            <Form>
                                 <Form.Label><h3>Register</h3></Form.Label>
                                <Form.Group>
                                <Form.Control type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder='First name' style={{marginTop:10}}/>
                                </Form.Group>
                                <Form.Group>
                                <Form.Control type="text" value={lastName} onChange={(e)=>{setlastName(e.target.value)}} placeholder='Last name' style={{marginTop:10}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email" style={{marginTop:10}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Type your password" style={{marginTop:10}}/>
                            </Form.Group>
                            <Form.Group>
                            <Form.Control type="phone" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} placeholder='Mobile' style={{marginTop:10}}/>
                            </Form.Group>
                            
                            <Button variant="primary" onClick={createNewAccount} style={{marginTop:12,width:'100%'}}>Submit</Button>
                            <Button variant="primary" onClick={()=>setAuthView("loginView")} style={{marginTop:12,width:'100%'}}>Back</Button>
                              </Form>
                            </>)
                            : authView === 'verifyView' ? (<>
                                <Form>
                                  <Form.Label><h3>Verify</h3></Form.Label>
                                  <Form.Group>
                                    <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="number" value={code} onChange={(e)=> setCode(e.target.value)} placeholder="Type your code"style={{marginTop:10}} />
                                </Form.Group>
                                <Button variant="primary" onClick={verifyMe} style={{marginTop:12,width:'100%'}}>Verify</Button>
                                <Button variant="primary" onClick={()=>setAuthView("loginView")} style={{marginTop:12,width:'100%'}}>Back</Button>
                                 </Form>
                            </>)
                            :  (<>
                            <Form>
                                 <Form.Label><h3>Recover</h3></Form.Label>
                                 <Form.Group>
                                    <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Type your email"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="number" value={code} onChange={(e)=> setCode(e.target.value)} placeholder="Type your code"style={{marginTop:10}} />
                                    <Button variant="info" onClick={getCode}>Get Code</Button>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Type your new password"style={{marginTop:10}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" value={passwordConfirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)} placeholder="Confirm password"style={{marginTop:10}} />
                                </Form.Group>
                                <Button variant="primary" onClick={changePassword} style={{marginTop:12,width:'100%'}}>Confirm</Button>
                                 <Button variant="primary" onClick={()=>setAuthView("loginView")} style={{marginTop:12,width:'100%'}}>Back</Button>
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