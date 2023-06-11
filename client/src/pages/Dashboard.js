import React,{useState,useEffect,} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import GameComponent from './../components/GameComponent';
import GamePage from '../components/GamePage';



const Dashboard = props => {
  const baseUrl = 'http://localhost:3001/api';
  const user = JSON.parse(localStorage.getItem("user"));


  const [games,setAllGames] = useState([]);
  const [allGenres,setAllGenres] = useState([]);

  const [commentView,setCommentView] = useState('no');
  const [cartItems,setCardItems] = useState(localStorage.getItem("Cart"));
 


  const loadAllGames = async()=>
  {
  
    const response = await fetch(baseUrl+"/readAllGames",{method:'GET'});
    const data = await response.json();
    setAllGames(data.message);
    //console.log(data);
  
  }
  const loadAllGenres = async()=>
  {
    const response = await fetch(baseUrl+"/readAllGenres",{method:'GET'});
    const data = await response.json();
    
    setAllGenres(data.message);
  
  }
  
  useEffect(()=>{
      loadAllGames();
      loadAllGenres();
      setCardItems(localStorage.getItem("Cart"));
    },[]);
    
    
    
    return (
        <>
        <Header/>
        <ToastContainer/>
            <Container style={{alignSelf:'center',width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:18}}>

           hi {JSON.stringify(user)}
            <Row className="justify-content-md-center">
                {
                    games.length> 0 ? games.map((item)=> (<Col xl="3"  ><GameComponent loadAllGames={loadAllGames} game={item}/></Col>)) : <p>no</p>
                } 
            </Row>
            {cartItems}<Button onClick={()=>{localStorage.removeItem("Cart")}}>empty cart</Button>
            </Container>
               


      
        </>
    )
}



export default Dashboard;