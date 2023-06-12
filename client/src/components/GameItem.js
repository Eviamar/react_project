import React, { useState,useEffect } from 'react';
import {Button,Container,Row,Col,Form,Card,Carousel,FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';





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
    try{
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
    }catch(error){
     console.log(error)
    }
   
  }
    return(
        <>
        {
          isEditable ? 
          (
            <>

<Card style={{ marginTop:10,marginBottom:10,borderWidth:1,borderColor:'#000',boxShadow:10,boxShadow: '1px 1px 12px #000'}}>
      
     
      <Card>
      <Card.Img style={{height:150,borderBottomLeftRadius:0,borderBottomRightRadius:0,}} src={props.game.gameImageCover} />
      <Card.ImgOverlay>
       <Row xl={12}style={{width:'100%',height:"100%",}}>
        <Col xl={6} > 
        <FloatingLabel label="Game name">
        <Form.Control value={GameName} onChange={(e)=>{setGameName(e.target.value)}} placeholder='Game name' /></FloatingLabel></Col>
        
        <Col xl={6}> <FloatingLabel label="Game price"><Form.Control  type="number" value={GamePrice} onChange={(e)=>{setGamePrice(e.target.value)}}/></FloatingLabel>
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
            <FloatingLabel label="Game releaes date">
      <Form.Control  type="date" value={GameReleaseDate} onChange={(e)=>{setGameReleaseDate(e.target.value)}} placeholder='Game release date' /></FloatingLabel>
      </Col>
      <Col style={{width:'30%' ,}}>
       <Card.Text style={{fontSize:13,textAlign:'right'}}>{isNaN(props.game.gameRating/props.game.gameRaters) ?(<>0</>) :(<>{props.game.gameRating/props.game.gameRaters}</>)}&#127942;</Card.Text>
       </Col>
      </Row>
      </Container>
      <Carousel style={{borderBottomWidth:5,borderTopWidth:5,borderBottomStyle:'double',borderTopStyle:'double'}}>
      {
        props.game.gameGallery && (props.game.gameGallery.map((pic)=><Carousel.Item style={{width:"100%",height:150,}}><Card.Img style={{borderRadius:0}}src={pic.imageSource}  onClick={()=>{window.open(pic.imageSource,'_blank',)}}/>
        </Carousel.Item>
        ))
      }
      </Carousel>
      <Card.Body>
                    <textarea value={GameDesc} onChange={(e)=>setGameDesc(e.target.value)} style={{color:'#000',backgroundColor:'#fff',width:'100%',height:100,borderTopWidth:1,borderColor:"#000",borderStyle:'dashed',borderBottomWidth:1}}></textarea>
                  <Container>
                    <Row>
                  </Row>
                  <Row style={{justifyContent:'space-evenly'}}>
                  <Button variant='dark'  onClick={() => setIsEditable(!isEditable)} style={{width:'25%'}}>🡰</Button><Button variant="success" style={{width:'25%'}} onClick={updateGame}>✔</Button>
                  </Row>
                  </Container>
                </Card.Body>
                
              </Card>

            {/* <Card style={{ marginTop:10 }}>
              
        <div style={{overflow:'hidden',width:'100%',height:180}} >
        <Card.Img variant="top" src={props.game.gameImageCover}/>
        
        </div>
        <Card.Body >
        <Form.Control type="text" value={GameName} onChange={(e)=>{setGameName(e.target.value)}} placeholder='Game name' style={{marginTop:10}}/>
          <Form.Control type="text" value={GamePrice} onChange={(e)=>{setGamePrice(e.target.value)}} placeholder='Game price' style={{marginTop:10}}/>
          <Form.Control type="text" value={GameDesc} onChange={(e)=>{setGameDesc(e.target.value)}} placeholder='Game description' style={{marginTop:10}}/>
          <Form.Control type="text" value={GameRating} onChange={(e)=>{setGameRating(e.target.value)}} placeholder='Game rating' style={{marginTop:10}}/>
          <Form.Control type="date" value={GameReleaseDate} onChange={(e)=>{setGameReleaseDate(e.target.value)}} placeholder='Game release date' style={{marginTop:10}}/>
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
      </Card> */}
            </>
          ) 
   
          : 

          ( 
            <>


          <Card style={{ marginTop:10,marginBottom:10,borderWidth:1,borderColor:'#000',boxShadow:10,boxShadow: '1px 1px 12px #000'}}>
      
     
      <Card>
      <Card.Img style={{height:150,borderBottomLeftRadius:0,borderBottomRightRadius:0,}} src={props.game.gameImageCover} />
      <Card.ImgOverlay>
       <Row xl={12}style={{width:'100%',height:"100%",}}>
        <Col xl={8} > <Card.Text style={{fontSize:26,color:'white',fontWeight:'800',textShadow:'1px 3px 3px #000',borderRadius:6,}}>
          {props.game.gameName}</Card.Text></Col>
        <Col xl={4}> <Card.Text style={{fontSize:18,color:'white',fontWeight:'800',textShadow:'1px 3px 3px #000',borderRadius:6,textAlign:'right'}}>&#65284;{props.game.gamePrice}</Card.Text>
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
      <Card.Text style={{fontSize:13,}}>{props.game.gameReleaseDate}</Card.Text>
      </Col>
      <Col style={{width:'30%' ,}}>
       <Card.Text style={{fontSize:13,textAlign:'right'}}>{isNaN(props.game.gameRating/props.game.gameRaters) ?(<>0</>) :(<>{props.game.gameRating/props.game.gameRaters}</>)}&#127942;</Card.Text>
       </Col>
      </Row>
      </Container>
      <Carousel style={{borderBottomWidth:5,borderTopWidth:5,borderBottomStyle:'double',borderTopStyle:'double'}}>
      {
        props.game.gameGallery && (props.game.gameGallery.map((pic)=><Carousel.Item style={{width:"100%",height:150,}}><Card.Img style={{borderRadius:0}}src={pic.imageSource}  onClick={()=>{window.open(pic.imageSource,'_blank',)}}/>
        </Carousel.Item>
        ))
      }
      </Carousel>
      <Card.Body>
                    <textarea value={props.game.gameDesc} style={{color:'#000',resize:'none',backgroundColor:'#bebebebe',width:'100%',height:100,borderTopWidth:1,borderColor:"#000",borderStyle:'dashed',borderBottomWidth:1}}disabled></textarea>
                  <Container>
                    <Row>
                  </Row>
                  <Row style={{justifyContent:'space-evenly'}}>
                  <Button variant='dark' onClick={() =>setIsEditable(!isEditable)} style={{width:'20%'}}>📝</Button><Button variant='danger' style={{width:'20%'}} onClick={props.Delete}>✘</Button>
                  </Row>
                  </Container>
                </Card.Body>
                
              </Card>
          </>
          
      //           <>
                
      //           <Card style={{ marginTop:10 }}>
      //   <div style={{overflow:'hidden',width:'100%',height:180}}>
      //   <Card.Img variant="top" src={props.game.gameImageCover} />
      
      //   </div>
      //   <div>
      //   {
      //     GameGallery && (GameGallery.map((pic)=><Card.Img src={pic.imageSource} style={{width:75,height:75,marginRight:2}} onClick={()=>{window.open(pic.imageSource,'_blank',)}}/>))
      //   }

      //   </div>
      //   {/* <Card.Img variant="top" src={props.game.gameGallery[0].imageSource} /> */}
      //   <Card.Body >
      //     <Card.Title >{props.game.gameName} | Rating: {isNaN(props.game.gameRating/props.game.gameRaters) ?(<>0</>) :(<>{props.game.gameRating/props.game.gameRaters}</>)}</Card.Title>
      //     <Card.Text style={{borderTopWidth:1,borderColor:"#000",borderTopStyle:'dashed',borderBottomWidth:1,borderBottomStyle:'dashed'}}>
      //      <p style={{color:'green'}}>Price: ${props.game.gamePrice}</p>
      //     {props.game.gameDesc}
      //     </Card.Text>
      //     <Container>
      //       <Row>
      //         <Col>
      //     <Button variant="primary" onClick={() =>setIsEditable(!isEditable)} style={{marginRight:5}}>Edit</Button>
      //     </Col>
      //     <Col>
      //     <Button variant="danger" onClick={props.Delete}>Delete</Button>
      //     </Col>
      //     </Row>
      //     </Container>
      //   </Card.Body>
      // </Card>
      //           </>
          )
        }
        </>
    
        
    )
}

export default GameItem;