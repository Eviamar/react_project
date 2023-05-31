import React,{useState,useEffect} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import GameItem from './../components/GameItem';

const Dashboard = props => {
  const baseUrl = 'http://localhost:3001/api';
  const user = JSON.parse(localStorage.getItem("user"));

 
    return (
        <>
        <Header/>
        <ToastContainer/>
            <Container style={{alignSelf:'center',width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%'}}>

           hi {JSON.stringify(user)} 
            </Container>
       


      
        </>
    )
}

export default Dashboard;