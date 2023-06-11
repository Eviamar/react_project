import React, { useState,useEffect } from 'react';
import {Button,Container,Row,Col,Form,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import {ToastContainer,toast} from 'react-toastify'


const GameComponent = (props) =>{
    const [allReviews,setAllReviews] = useState(props.game.gameReviews);
    const [game,setGame] = useState();
    const [gameDate,setGameDate] = useState("");
    const baseUrl = 'http://localhost:3001/api';
    const [reviewBtnDisabled,setReviewBtnDisabled] = useState(false);
    const [title,setTitle] = useState("");
    const [review,setReview] = useState("");
    const [userRating,setUserRating] = useState(0);
    const [addReview,setAddReview] = useState(false);
    const Rate = Array.from({length: 10}, (_, i) => i + 1);
    const [userName,setUserName] = useState(""); 



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
        setReviewBtnDisabled(CheckIfCommitedReview);
    },game,)
 
    const CheckIfCommitedReview=()=>{
      const reviews = props.game.gameReviews;
      for(let i=0; i<reviews.length;i++){
        if(reviews[i].userAuthor===JSON.parse(localStorage.getItem("user"))._id)
        {
          return true;
        }
      }
      return false;
    }
    const CommitReview = async()=>{
      if(CheckIfCommitedReview)
      {
        toast.error("Already commited");
        return;
      }
      const response = await fetch(baseUrl+"/AddReview/"+props.game._id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        userAuthor: JSON.parse(localStorage.getItem("user"))._id,
        title: title,
        review:review,
        userRating:parseInt(userRating)
            
      })});
      const data = await response.json(); 
      toast.success("Review saved, thank you")
      setAddReview(!addReview);
    }

const GetUserNameByID=async(uid)=>{
  const response = await fetch(baseUrl+"/account/readUserByID"+uid,{method:'GET'});
    const data = await response.json();
    console.log("username"+data.message.userName)
    return data.message.userName;
    //console.log(users);
}
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
                    {
                      addReview  ?
                     
                       (<>
                        {
                        !reviewBtnDisabled &&   (<Form>
                          <Row>
                          <Col>
                          <Form.Control type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
                          </Col>
                          <Col>
                          <Form.Select  onChange={(e)=>{setUserRating(e.target.value)}} aria-label="Default select example">
                          <option selected>Select Rating</option>
                          {
                            Rate.length > 0 &&
                            Rate.map((rate) => (<option value={rate}>{rate}</option>))
                          }
                </Form.Select></Col></Row>
                
                          <textarea style={{width:'100%'}} type="text" placeholder='Review' onChange={(e)=>setReview(e.target.value)}/>
                          
                          <Row style={{justifyContent:'space-evenly'}}>
                            <Button variant='dark' onClick={()=>setAddReview(!addReview)} style={{width:'30%'}}>←</Button><Button  style={{width:'30%'}} variant='success' onClick={CommitReview} disabled={reviewBtnDisabled}>&#x2714;</Button>
                          </Row>
                          </Form>)
                        }
                       
                       

                        {
                           reviewBtnDisabled && (<><h6>Reviews:</h6>
                          <Carousel >
                          {
                            allReviews.length>0 && allReviews.map((review)=>(
                              <Carousel.Item  >
                            <Card style={{backgroundColor:'#bebebebe'}}>
                              <Card.Body>
                                <Card.Title>Title: {review.title}</Card.Title>
                                <Card.Text>Rating: {review.userRating}</Card.Text>
                                <textarea disabled style={{resize:'none'}} value={review.review}></textarea>
                                </Card.Body></Card></Carousel.Item>
                                ))
                          }
                          </Carousel> <Button variant='dark' onClick={()=>setAddReview(!addReview)} style={{width:'30%'}}>←</Button></>)
                        }
                        
                        </>) :
                      
                      (<><Button variant='dark' style={{width:'20%'}} onClick={()=>setAddReview(!addReview)}>&#128196;</Button><Button variant='dark' style={{width:'20%'}} onClick={()=>AddToCart(props.game)}>🛒</Button>
                      </>) 
                    }
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