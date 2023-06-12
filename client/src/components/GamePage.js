import React, { useState,useEffect } from 'react';
import {Button,Container,Row,Col,Form,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const GamePage = (props) =>{

    const [game,setGame] = useState();
    const baseUrl = 'http://localhost:3001/api';
    
    const GetGameData = async()=>{
      try{
        const response = await fetch(baseUrl+"/readGameById/"+props.game.gameId,{method:'GET'});
        const data = await response.json();
        setGame(data.message);
      }catch(error){
       console.log(error)
      }
      
    }

  

    useEffect(()=>{
        GetGameData();
        
    },game,)
    return(
<>
{
    game && (<Card style={{ marginTop:10 }}>
        <div style={{overflow:'hidden',width:'100%',height:180}}>
        <Card.Img variant="top" src={game.gameImageCover} />
      
        </div>
        <div>
        {
          game.gameGallery && (game.gameGallery.map((pic)=><Card.Img src={pic.imageSource} style={{width:75,height:75,marginRight:2}} onClick={()=>{window.open(pic.imageSource,'_blank',)}}/>
          
          ))
        }

        </div>
        <Card.Body>
                  <Card.Title >{game.gameName} {game.gameReleaseDate} {isNaN(props.game.gameRating/props.game.gameRaters) ?(<>0</>) :(<>{props.game.gameRating/props.game.gameRaters}</>)}</Card.Title>
                  
                  <Card.Text style={{borderTopWidth:1,borderColor:"#000",borderTopStyle:'dashed',borderBottomWidth:1,borderBottomStyle:'dashed'}}>
                    
                  {game.gameDesc}
                  </Card.Text>
                  <Container>
                    <Row>
                  </Row>
                  </Container>
                </Card.Body>
              </Card>
             )
}
</>

    )
}

export default GamePage;