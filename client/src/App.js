import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login.js";
import Dashboard from './pages/Dashboard.js';
import Settings from './pages/settings.js';
import AdminPage from './pages/AdminPage.js';


import './App.css';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={user ? (<Dashboard/>) : (<Login/>)}/>
            <Route path="/game" element={user ? (<></>):(<Login/>)}/>
            <Route path="/cart" element={user ? (<></>):(<Login/>)}/>
            <Route path="/gamesgallery" element={user ? (<></>):(<Login/>)}/>
            <Route path="/settings" element={user ? (<Settings/>) : (<Login/>)}/>
            <Route path="/admin" element={user ? ( user.isAdmin ? (<AdminPage/>) : (<Dashboard/>)) : (<Login/>)}/>
            
          </Routes>
        </Router>
    </>
  );
}

export default App;
