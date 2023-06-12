import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login.js";
import Dashboard from './pages/Dashboard.js';
import Settings from './pages/settings.js';
import AdminPage from './pages/AdminPage.js';


import './App.css';
import NotFound from './pages/NotFound.js';
import Cart from './pages/Cart.js';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" exact element={user ? (<Dashboard/>) : (<Login/>)}/>
            <Route path="/cart" element={user ? (<Cart></Cart>):(<Login/>)}/>
            <Route path="/settings" exact element={user ? (<Settings/>) : (<Login/>)}/>
            <Route path="/admin" exact element={user ? ( user.isAdmin ? (<AdminPage/>) : (<Dashboard/>)) : (<Login/>)}/>
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </Router>
    </>
  );
}

export default App;
