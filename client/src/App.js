import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {Button,Container,Row,Col,Form,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import Login from "./pages/Login.js";
import Dashboard from './pages/Dashboard.js';

function App() {
  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/game" element={<></>}/>
            <Route path="/cart" element={<></>}/>
          </Routes>
        </Router>
    </>
  );
}

export default App;
