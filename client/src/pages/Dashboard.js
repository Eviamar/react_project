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

  const [selectedGenre,setSelectedGenre] = useState("Select Genre");
  const [games,setAllGames] = useState([]);
  const [allGenres,setAllGenres] = useState([]);
  const [chosenRate,setChosenRate] = useState(1);
  const Rate = Array.from({length: 10}, (_, i) => i + 1);

  
  const [cartItems,setCardItems] = useState(localStorage.getItem("Cart"));
 
  const [filterView,setFilterView] = useState("Select Genre");

  const [selectedPrice,setSelectedPrice] = useState(0);
  const [selectedGameName,setSelectedGameName] = useState("");


const filter = async()=>{
  console.log(`chosenRate=>${typeof(chosenRate)} ${chosenRate}`)
  console.log(`chosenRate=>${typeof(selectedPrice)} ${selectedPrice}`)
  try{
    let gameList = games;
    setAllGames([]);
    if(selectedGameName!==""){
      
      const results = await gameList.filter(game=>  game.gameName.toLowerCase().includes(selectedGameName.toLowerCase()) );
      if(results.length===0){
        toast.error("nothing found");
        loadAllGames();
      }
      setAllGames(results);
    }
    else if(parseInt(selectedPrice)>0){
      const results = await gameList.filter(game=>  game.gamePrice<=parseInt(selectedPrice) );
      if(results.length===0){
        toast.error("nothing found");
        loadAllGames();
      }
      setAllGames(results);
    }
    else if(parseInt(chosenRate)>0){
      const results = await gameList.filter(game=>  Math.floor(game.gameRating/game.gameRaters)===parseInt(chosenRate));
      if(results.length===0){
        toast.error("nothing found");
        loadAllGames();
      }
      setAllGames(results);
    }
     else{
      loadAllGames();
     }
     setChosenRate(1);
     setSelectedPrice(0);
     setSelectedGameName("");

  }catch(error){
    console.log(error)
  }
}

  const loadAllGames = async()=>
  {
    try{
            const response = await fetch(baseUrl+"/readAllGames",{method:'GET'});
            const data = await response.json();
            setAllGames(data.message);
    }catch(error){
        console.log(error);
    }
    
   
  
  }
  
  const loadAllGenres = async()=>
  {
    try{
        const response = await fetch(baseUrl+"/readAllGenres",{method:'GET'});
        const data = await response.json();
        
        setAllGenres(data.message);
    }catch(error){
        console.log(error);
    }
   
  
  }
  
  useEffect(()=>{
      loadAllGames();
      loadAllGenres();
      setCardItems(localStorage.getItem("Cart"));
      
    },[]);
    
    
    const FilterView=async(e)=>{
        try{
            if(e==="Select Genre"){
              loadAllGames();
              return;
            }
            allGenres.map((x)=>{if(e===x._id) {setFilterView( x.genreName);}});
            setAllGames([]);
            const response = await fetch(baseUrl+"/readGameByGenre/"+e,{method:'GET'});
            const data = await response.json();
            setAllGames(await data.message);
        }catch(error){
            console.log(error)
        }
   
    }
    return (
        <>
        <Header/>
        <ToastContainer/>
            <Container style={{alignSelf:'center',width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:18}}>
          
           <h1>Games</h1>
           <Form style={{padding:10,}}>
            <Row style={{justifyContent:'space-evenly'}} xl={50}>
           
            <Form.Control type="text" placeholder='Name' value={selectedGameName} onChange={(e)=>setSelectedGameName(e.target.value)} style={{width:'30%'}}/>
            <Form.Control type="number" placeholder='Price range' value={selectedPrice} onChange={(e)=>{setSelectedPrice(e.target.value)}} style={{width:'15%'}}/>
            <Form.Select style={{width:'15%'}} value={chosenRate}  onChange={(e)=>{setChosenRate(e.target.value)}} aria-label="Default select example">
                          
                          {
                            Rate.length > 0 &&
                            Rate.map((rate) => (<option value={rate}>{rate}</option>))
                          }
                </Form.Select>
                <Button variant='dark' style={{width:'15%'}} onClick={filter}>Filter</Button>
              
            <Form.Select style={{width:'15%'}} onChange={(e)=>{FilterView(e.target.value)}} aria-label="Default select example">
              <option selected>Select Genre</option>
                
                {
                  allGenres.length > 0 &&
                  allGenres.map((genre) => (<option value={genre._id}>{genre.genreName}</option>))
                }
              </Form.Select>
              <Button variant='dark' style={{width:'5%'}} onClick={loadAllGames}>↻</Button>
              </Row>
           </Form>

            <Row className="justify-content-md-center">
        
                {
                      ( games.length> 0 && games.map((item)=> (<Col xl="3"  ><GameComponent loadAllGames={loadAllGames} game={item}/></Col>))) 
                }
            </Row>
           
            </Container>
               


      
        </>
    )
}



export default Dashboard;