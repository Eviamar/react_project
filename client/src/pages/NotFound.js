import React from 'react';
import { Button, Container, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const NotFound = () =>{
    const naviagte = useNavigate();
    return (
        <>

       <Container style={{textAlign:'center',alignSelf:'center',width:'25%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'10%',borderRadius:18,padding:20}}>
        <h1>🅟🅐🅖🅔 🅝🅞🅣 🅕🅞🅤🅝🅓 </h1>
        <h1>¯\_( ͡👁️ ͜ʖ ͡👁️)_/¯</h1>


        <Button variant='dark' style={{marginTop:'5%',fontSize:25}}onClick={()=> {naviagte(-1)} }>gₒ ᵦₐ𝄴ₖ</Button>
 </Container>
        </>
    )
}

export default NotFound;