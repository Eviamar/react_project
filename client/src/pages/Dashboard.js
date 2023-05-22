import React,{useState,useEffect} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';







import axios from 'axios';

const Dashboard = props => {
  const user = JSON.parse(localStorage.getItem("user"));
  

    return (
        <>

      <p>Hello {user}</p>


      
        </>
        
    )
}

export default Dashboard;