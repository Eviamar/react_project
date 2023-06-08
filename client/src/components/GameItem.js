import React, { useState } from 'react';
import {Button,Container,Row,Col,Form,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const game = {
  gameGenre:'',
  gameName:'',
  gamePrice:'',
  gameDesc:'',
  gameImageCover:'',
  gameGallery:[{imageSource:'',}],
  gameRaters:'',
  gameRating:'',
  gameReleaseDate:'',
  gameReviews:[{createdAt:'',title:'',review:'',userAuthor:'',isCommitedReview:''}],
}

const GameItem = props =>{
  const baseUrl = 'http://localhost:3001/api';
  const [isEditable,setIsEditable] = useState(false);
//const [selectedGenre,setSelectedGenre] = useState(props.genreId);
  const [GameName,setGameName] = useState(props.game.gameName);
  const [GamePrice,setGamePrice] = useState(props.game.gamePrice);
  const [GameDesc,setGameDesc] = useState(props.game.gameDesc);
  const [GameImage,setGameImage] = useState(props.game.gameImageCover);
  const [GameGallery,setGameGallery] = useState(props.game.gameGallery);
  const [GameRating,setGameRating] = useState(props.game.gameRating);
  const [GameReleaseDate,setGameReleaseDate] = useState(props.game.gameReleaseDate);

  const updateGame = async()=>{
    const response = await fetch(baseUrl+"/updateGame/"+props.game._id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
          gameName: GameName,
          gameDesc: GameDesc,
          gameRating: GameRating,
          gamePrice: GamePrice,
          gameReleaseDate: GameReleaseDate,
          gameImage: GameImage
    })});
    const data = await response.json(); 
    setIsEditable(false);
    props.loadAllGames();
  }
    return(
        <>
        {
          isEditable ? 
          (
            <>
            <Card style={{ marginTop:10 }}>
              
        <div style={{overflow:'hidden',width:'100%',height:180}} >
        <Card.Img variant="top" src={props.game.gameImageCover}/>
        
        </div>
        <Card.Body >
        <Form.Control type="text" value={GameName} onChange={(e)=>{setGameName(e.target.value)}} placeholder='Game name' style={{marginTop:10}}/>
          <Form.Control type="text" value={GamePrice} onChange={(e)=>{setGamePrice(e.target.value)}} placeholder='Game price' style={{marginTop:10}}/>
          <Form.Control type="text" value={GameDesc} onChange={(e)=>{setGameDesc(e.target.value)}} placeholder='Game description' style={{marginTop:10}}/>
          <Form.Control type="text" value={GameRating} onChange={(e)=>{setGameRating(e.target.value)}} placeholder='Game rating' style={{marginTop:10}}/>
          <Form.Control type="text" value={GameReleaseDate} onChange={(e)=>{setGameReleaseDate(e.target.value)}} placeholder='Game release date' style={{marginTop:10}}/>
          <Form.Control type="text" value={GameImage} onChange={(e)=>{setGameImage(e.target.value)}} placeholder='Game image' style={{marginTop:10}}/>
          <Container>
            <Row>
              <Col>
          <Button variant="primary" onClick={() => setIsEditable(!isEditable)} style={{marginRight:5}}>Back</Button>
          </Col>
          <Col>
          <Button variant="success" onClick={updateGame}>Save</Button>
          </Col>
        
          </Row>
          </Container>
        </Card.Body>
      </Card>
            </>
          ) 
   
          : 

          ( 
                <>
                <Card style={{ marginTop:10 }}>
        <div style={{overflow:'hidden',width:'100%',height:180}}>
        <Card.Img variant="top" src={props.game.gameImageCover} />
      
        </div>
        <div>
        {
          GameGallery && (GameGallery.map((pic)=><Card.Img src={pic.imageSource} style={{width:75,height:75,marginRight:2}} onClick={()=>{window.open(pic.imageSource,'_blank',)}}/>))
        }

        </div>
        {/* <Card.Img variant="top" src={props.game.gameGallery[0].imageSource} /> */}
        <Card.Body >
          <Card.Title >{props.game.gameName} | Rating: {props.game.gameRating}</Card.Title>
          <Card.Text style={{borderTopWidth:1,borderColor:"#000",borderTopStyle:'dashed',borderBottomWidth:1,borderBottomStyle:'dashed'}}>
           <p style={{color:'green'}}>Price: ${props.game.gamePrice}</p>
          {props.game.gameDesc}
          </Card.Text>
          <Container>
            <Row>
              <Col>
          <Button variant="primary" onClick={() =>setIsEditable(!isEditable)} style={{marginRight:5}}>Edit</Button>
          </Col>
          <Col>
          <Button variant="danger" onClick={props.Delete}>Delete</Button>
          </Col>
          </Row>
          </Container>
        </Card.Body>
      </Card>
                </>
          )
        }
        </>
        
        
    )
}

export default GameItem;