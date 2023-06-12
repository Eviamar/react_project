import React,{useState,useEffect,} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import GameComponent from './../components/GameComponent';
import GamePage from '../components/GamePage';

import axios from 'axios';



const Cart = props => {
  const baseUrl = 'http://localhost:3001/api';
  const user = JSON.parse(localStorage.getItem("user"));

  

    const [totalCost,setTotalCost] = useState(0);
    const [isCartLoaded,SetIsCartLoaded] = useState(false)

 const [cartItems,setCartItems] = useState([]);

 const itemsInCart = localStorage.getItem("Cart");



  const getGameData = async() =>
  {
    if(!localStorage.Cart){
        toast.error("Cart is empty!")
        return;
    }
    if(isCartLoaded)
        return;
    const itemsInLocalStorage = itemsInCart.substring(1,localStorage.Cart.length);
    const listOfIDs = itemsInLocalStorage.split(',');
    let cost = 0;
    for(let i = 0; i< listOfIDs.length;i++)
    {
        const response = await fetch(baseUrl+"/readGameById/"+listOfIDs[i].substring(1,listOfIDs[i].length-1),{method:'GET'});
        const data = await response.json();
        setCartItems(cartItems=>[...cartItems,data.message]);
        cost+= data.message.gamePrice;
        setTotalCost(cost);
    }
    SetIsCartLoaded(true);
    
  }

const PurchaseMethod=async()=>
{
    try{
        for(let i = 0; i< cartItems.length;i++){
            console.log(cartItems[i]._id)
             const response = await fetch(baseUrl+"/account/addGameToCollection/"+user._id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
                 "gameId": cartItems[i]._id
           })});
           const data = await response.json().then(result=>{
             
           }) 
           .catch(error=>{
             toast.error(error.message)
           })
           //user = JSON.parse(localStorage.getItem("user"));
          
           localStorage.removeItem("Cart");
         } 
         toast.success("Purchased done, thank you!")
    }catch(error){
     console.log(error)
    }
    
}
const RemoveItem=(item)=>{
    console.log(item._id)
    cartItems.pop(item);
    localStorage.setItem("Cart",[]);
    for(let i = 0; i< cartItems.length;i++)
        localStorage.setItem("Cart",[localStorage.Cart,JSON.stringify(cartItems[i]._id)]);
    //console.log(localStorage.Cart)
    window.location.reload(false);
}

const EmptyCart =() =>{
    localStorage.removeItem("Cart")
    getGameData();
    window.location.reload(false);
}

useEffect(()=>{
    
},[""])
    return (
        <>
        <Header/>
        <ToastContainer/>
            <Container  style={{alignSelf:'center',width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:18}}>

           {/* hi Cart {cartItems.length} <br></br> */}
        <h1>Items in cart:</h1>
        <Button onClick={getGameData}>Load cart</Button>
            <Row className="justify-content-md-center" style={{width:'100%'}} >
                {
                    cartItems.length> 0 ? cartItems.map((item)=> (<><Col xl={3}  style={{width:250,marginBottom:10}}>
                        
                        <Card>
                        <Card.Body>
                            <Card.Img  style={{height:100,borderBottomLeftRadius:0,borderBottomRightRadius:0,}} src={item.gameImageCover}/>
                            <Card.ImgOverlay style={{textAlign:'right'}}><Button variant='danger' style={{textShadow:'0px 0px 4px #cc0000',borderRadius:0,borderBottomLeftRadius:8,}} onClick={()=>RemoveItem(item)}>✘</Button></Card.ImgOverlay>
                            <Card.Title>Game: {item.gameName}</Card.Title>
                            <Card.Title>Price: {item.gamePrice}</Card.Title>
                            
                        </Card.Body>
                    </Card>
                    </Col>
                    
                   </>)
                   ) 
                    : 
                    <p>Your cart is empty, go back and add some games!</p>
                } <Row/>

               {
                cartItems.length>0 && ( <Row className="justify-content-md-center" style={{width:'45%',marginBottom:10}}>
                <Card style={{marginBottom:10}}>
                <Card.Body>
                 {
                        totalCost> 0 && (<><h3 style={{textAlign:'center',}}>Cost: {totalCost}</h3></>)
                    }
                    
                    </Card.Body>
                    </Card>
                    <Row style={{justifyContent:'space-evenly'}}>
                    <Button style={{width:'25%'}} onClick={PurchaseMethod}>Purchase</Button><Button style={{width:'25%'}} variant='danger' onClick={EmptyCart}>Empty cart</Button>
                    </Row>
                    </Row>)
               }
                
            </Row>
            </Container>
               


      
        </>
    )
}



export default Cart;