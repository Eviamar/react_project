import React, { useState,useEffect } from 'react';
import {Button,Container,Row,Col,Form,Card,Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

const GameCard = (props) =>{
const [gameDate,setGameDate]= useState("");
    const [game,setGame] = useState();
    const baseUrl = 'http://localhost:3001/api';
    const GetGameData = async()=>{
    const response = await fetch(baseUrl+"/readGameById/"+props.game.gameId,{method:'GET'});
    const data = await response.json();
    if(data.message!==false)
    {
      setGame(data.message);
      const date = new Date(data.message.gameReleaseDate);
      setGameDate(date.toLocaleDateString('en-GB').toString());
    
    }
    }

  

    useEffect(()=>{
        GetGameData();
        
    },game,)
    return(
<>
<ToastContainer/>

{
    game && (<Card style={{ marginTop:10,marginBottom:10,borderWidth:1,borderColor:'#000',boxShadow:10,boxShadow: '1px 1px 12px #000'}}>
      
     
    <Card>
    <Card.Img style={{height:150,borderBottomLeftRadius:0,borderBottomRightRadius:0,}} src={game.gameImageCover} />
    <Card.ImgOverlay>
     <Row xl={12}style={{width:'100%',height:"100%",}}>
      <Col xl={8} > <Card.Text style={{fontSize:26,color:'white',fontWeight:'800',textShadow:'1px 3px 3px #000',borderRadius:6,}}>
        {game.gameName}</Card.Text></Col>
      
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
              </Card>
             )
}
</>

    )
}

export default GameCard;