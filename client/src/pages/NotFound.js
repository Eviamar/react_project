import React from 'react';
import { Button, Container, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const NotFound = () =>{
    const naviagte = useNavigate();
    return (
        <>
        
       <Container style={{textAlign:'center',alignSelf:'center',width:'25%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:18,padding:20}}>
        <h1>Page Not Found</h1>

        <Button onClick={()=> {naviagte(-1)} }>Go back</Button>
 </Container>
        </>
    )
}

export default NotFound;