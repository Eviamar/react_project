import React, { useState,useEffect } from 'react';
import {Button,Container,Row,Col,Form,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { set } from 'mongoose';


const GameComponent = (props) =>{

    const [game,setGame] = useState();
    const [gameDate,setGameDate] = useState("");
    const baseUrl = 'http://localhost:3001/api';
    
    const GetGameData = async()=>{
        const response = await fetch(baseUrl+"/readGameById/"+props.game._id,{method:'GET'});
    const data = await response.json();
    setGame(data.message);
    const date = new Date(data.message.gameReleaseDate);
    setGameDate(date.toLocaleDateString('en-GB').toString());
    
    }
    
    //const [totalItems,setTotalItems] = useState([]);
    const AddToCart= (item)=>{
      //setTotalItems(totalItems=>[...totalItems,item]);
      
      
    localStorage.setItem("Cart",[localStorage.Cart,JSON.stringify(item._id)]);
    //console.log("TotalItems=>"+totalItems);
    console.log("Cart=>"+localStorage.getItem("Cart"));
    
 
    }
    useEffect(()=>{
        GetGameData();
        
    },game,)
    return(
<>
{
    game && (
      <Card style={{ marginTop:10,marginBottom:10,borderWidth:1,borderColor:'#000',boxShadow:10,boxShadow: '1px 1px 12px #000'}}>
      
     
        <Card>
        <Card.Img style={{height:150,borderBottomLeftRadius:0,borderBottomRightRadius:0,}} src={game.gameImageCover} />
        <Card.ImgOverlay>
         <Row xl={12}style={{width:'100%',height:"100%",}}>
          <Col xl={8} > <Card.Text style={{fontSize:26,color:'white',fontWeight:'800',textShadow:'1px 3px 3px #000',borderRadius:6,}}>
            {game.gameName}</Card.Text></Col>
          <Col xl={4}> <Card.Text style={{fontSize:18,color:'white',fontWeight:'800',textShadow:'1px 3px 3px #000',borderRadius:6,textAlign:'right'}}>&#65284;{game.gamePrice}</Card.Text>
          </Col>
          </Row>
            </Card.ImgOverlay>
            </Card>
            <Container >
            <Row >
              <Col>
              <Card.Text style={{fontSize:16,fontWeight:'bold',textShadow:'1px 3px 3px #bebebe'}}>
              Release Date
              </Card.Text>
              </Col>
              <Col>
              <Card.Text style={{fontSize:16,textAlign:'right',fontWeight:'bold',textShadow:'1px 3px 3px #bebebe'}}>
              Rating
              </Card.Text>
              </Col>
            </Row>
            <Row >
              <Col style={{width:'80%',}} >
        <Card.Text style={{fontSize:13,}}>{gameDate}</Card.Text>
        </Col>
        <Col style={{width:'30%' ,}}>
         <Card.Text style={{fontSize:13,textAlign:'right'}}>{isNaN(props.game.gameRating/props.game.gameRaters) ?(<>0</>) :(<>{props.game.gameRating/props.game.gameRaters}</>)}&#127942;</Card.Text>
         </Col>
        </Row>
        </Container>
        <Carousel style={{borderBottomWidth:5,borderTopWidth:5,borderBottomStyle:'double',borderTopStyle:'double'}}>
        {
          game.gameGallery && (game.gameGallery.map((pic)=><Carousel.Item style={{width:"100%",height:150,}}><Card.Img style={{borderRadius:0}}src={pic.imageSource}  onClick={()=>{window.open(pic.imageSource,'_blank',)}}/>
          </Carousel.Item>
          ))
        }
        </Carousel>
        
        
        
        <Card.Body>
                    <textarea value={game.gameDesc} style={{color:'#000',resize:'none',backgroundColor:'#bebebebe',width:'100%',height:100,borderTopWidth:1,borderColor:"#000",borderStyle:'dashed',borderBottomWidth:1}}disabled></textarea>
                  <Container>
                    <Row>
                  </Row>
                  <Row style={{justifyContent:'space-evenly'}}>
                  <Button variant='dark' style={{width:'20%'}}>&#128196;</Button><Button variant='dark' style={{width:'20%'}} onClick={()=>AddToCart(props.game)}>🛒</Button>
                  </Row>
                  </Container>
                </Card.Body>
                
              </Card>
             )
}
</>

    )
}

export default GameComponent;