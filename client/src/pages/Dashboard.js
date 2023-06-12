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
  const [chosenRate,setChosenRate] = useState();
  const Rate = Array.from({length: 10}, (_, i) => i + 1);

  
  const [cartItems,setCardItems] = useState(localStorage.getItem("Cart"));
 
  const [filterView,setFilterView] = useState("Select Genre");


  const loadAllGames = async()=>
  {
    try{
        if(filterView==="Select Genre")
        {

            setAllGames([]);
            const response = await fetch(baseUrl+"/readAllGames",{method:'GET'});
            const data = await response.json();
            setAllGames(await data.message);
            //console.log(data);
        }
        else
            FilterView();
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
    
    
    const FilterView=async()=>{
      console.log(selectedGenre)
      console.log(filterView)

        try{
            if(selectedGenre!=="Select Genre")
            {
                allGenres.map((x)=>{if(selectedGenre===x._id) {setFilterView( x.genreName);}});
                setAllGames([]);
                const response = await fetch(baseUrl+"/readGameByGenre/"+selectedGenre,{method:'GET'});
                const data = await response.json();
                
                setAllGames(await data.message);
                
            }
            else
                loadAllGames();
            
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
           <Form style={{padding:10,}}><Row style={{justifyContent:'space-evenly'}}>
            <Form.Control type="text" placeholder='Name' style={{width:'30%'}}/>
            <Form.Control type="number" placeholder='Price range' style={{width:'15%'}}/>
            <Form.Select style={{width:'15%'}}  onChange={(e)=>{setChosenRate(e.target.value)}} aria-label="Default select example">
                          <option selected>Select Rating</option>
                          {
                            Rate.length > 0 &&
                            Rate.map((rate) => (<option value={rate}>{rate}</option>))
                          }
                </Form.Select>
            <Form.Select style={{width:'20%'}} onChange={(e)=>{setSelectedGenre(e.target.value)}} aria-label="Default select example">
              <option selected>Select Genre</option>
                
                {
                  allGenres.length > 0 &&
                  allGenres.map((genre) => (<option value={genre._id}>{genre.genreName}</option>))
                }
              </Form.Select>
              <Button variant='dark' style={{width:'10%'}} onClick={FilterView}>Filter</Button></Row>
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