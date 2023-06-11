import React, { useEffect, useState } from "react";
import { Navbar, Container,Nav,NavDropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../logo.png';
import {useNavigate} from 'react-router-dom'
const Header = props =>{
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate(); 
  
  const logout = ()=>
  {
    localStorage.clear();
    navigate('/')
  }

  
    return(
        <Navbar bg="light" expand="lg">
      <Container>
      <img src={logo} alt="logo" style={{width:150,marginRight:'5%'}} onClick={()=>{navigate('/dashboard')}} />
        <Navbar.Brand>{user && (<><p style={{fontSize:15,textAlign:'center',marginTop:20}}>Hello, {user.firstName}</p></>)}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>  
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/settings">Account settings</NavDropdown.Item>
              {
              user.isAdmin && (<NavDropdown.Item href="/admin">Admin Page</NavDropdown.Item>) 
            }
              <NavDropdown.Item href="/cart">
                Cart
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Your games</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>      
      </Container>
    </Navbar>
    )
}

export default Header;