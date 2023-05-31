import React,{useState,useEffect} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table, Navbar,Nav,Image, FormLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import axios from 'axios';
import GameItem from './../components/GameItem';


const AdminPage = props => {
  const user = JSON.parse(localStorage.getItem("user"));

  const baseUrl = 'http://localhost:3001/api';
  const [games,setAllGames] = useState([]);
  const [allGenres,setAllGenres] = useState([]);
  const [selectedGenre,setSelectedGenre] = useState("Select Genre");
  const [selectedGameName,setSelectedGameName] = useState("");
  const [selectedGamePrice,setSelectedGamePrice] = useState("");
  const [selectedGameDesc,setSelectedGameDesc] = useState("");
  const [selectedGameImage,setSelectedGameImage] = useState("");
  const [selectedGameGallery,setSelectedGameGallery] = useState([]);
  //const [selectedGameRating,setSelectedGameRating] = useState("");
  const [selectedGameReleaseDate,setSelectedGameReleaseDate] = useState("");

  const [imageCoverFile,setImageCoverFile] =  useState(FileList | null);
  
  const [galleryFiles,setGalleryFiles] = useState(FileList | null);

  const [adminView,setAdminView] = useState("addGame");

  const preset_key = 'irkdzxu3';
  const cloud_name ='doaxabeif';

  const addNewGame = async()=>{
    
    if(selectedGenre!=="Select Genre")
    {
      if(selectedGameName!=="" && selectedGamePrice!=="" && selectedGameDesc!=="" && imageCoverFile!==null)
      {
        
        
        //console.log('hello from addNewGame AdminPage')
        const response = await fetch(baseUrl+"/createGame",{method:'POST',headers:{'Content-Type':'application/json'},
          body : JSON.stringify({
          genreId: selectedGenre,
          addedBy:user._id,
          gameName: selectedGameName,
          gameDesc: selectedGameDesc,
          //gameRating: selectedGameRating,
          gamePrice: selectedGamePrice,
          gameReleaseDate: selectedGameReleaseDate,
          gameImageCover: selectedGameImage,
          gameGallery: selectedGameGallery
         
        
        })  
        
      }
      );
      console.log("selectedGameGallery===> "+selectedGameGallery);
      const data = await response.json();
    //   console.log(data);
    //   console.log(selectedGameReleaseDate)
    
      toast.success(`Game ${data.message.gameName} Added`);
      // setSelectedGameName('')
      // setSelectedGameDesc('')
      // setSelectedGameRating('')
      // setSelectedGamePrice('')
      // setSelectedGameReleaseDate('')
      // setSelectedGameImage('')
      loadAllGames();
      }
      else
      {
        toast.error("All fields are required")
      }
    } 
    else{
      toast.error("Please select genre")
    }
  }

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
  },[]);

  const DeleteGameById = async(gid)=>{
    const response = await fetch(baseUrl+"/deleteGame/"+gid,{method:'DELETE'});
    try{
      const data = await response.json();
      toast.success(`${data.message.gameName} has been deleted`)
      loadAllGames();
    }catch(error){
      toast.error(error.message)
    }
  }


  // const onItemChange=(e)=>{
  //   setRowItem((prev)=>({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }))
  // }

  const uploadGameImages = async ()=>{
   
    //upload cover image
    const formData = new FormData();
      formData.append('file',imageCoverFile);
      formData.append('upload_preset',preset_key);
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
    .then(results =>
    {
      toast.success(`image cover successfully\n${results.data.secure_url}`)
      setSelectedGameImage(results.data.secure_url);
      console.log(`Image Cover ===> ${selectedGameImage}`);
    })
    .catch(error=>
    {
      toast.error(error.message);
    })
    //upload gallery
    const formData2 = new FormData();
   for(let i=0;i<galleryFiles.length;i++)
    {
      formData2.append('file',galleryFiles[i]);
      console.log("formData append ==> "+galleryFiles[i] );
      formData2.append('upload_preset',preset_key);
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData2)
    .then(results =>
    {
      
      toast.success(`image ${i+1} uploaded successfully\n${results.data.secure_url}`)
      setSelectedGameGallery(selectedGameGallery=>[...selectedGameGallery,{imageSource:results.data.secure_url,}])
      console.log("gallery image"+i+"==> "+selectedGameGallery[i]);
      
    })
    .catch(error=>
    {
      toast.error(error.message);
    })
    }
    
  }

  const uploadGameCover= (/*e*/)=>{
    //const file = e.target.files[0];
    //setImageCoverFile(file);
    console.log("ImageCover==>"+imageCoverFile);

    const formData = new FormData();
      formData.append('file',imageCoverFile);
      formData.append('upload_preset',preset_key);
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
    .then(results =>
    {
      toast.success(`image cover successfully\n${results.data.secure_url}`)
      console.log("Image Cover ===> "+results.data.secure_url)
      setSelectedGameImage(results.data.secure_url) 
    })
    .catch(error=>
    {
      toast.error(error.message);
    })
    
    
  }
  const uploadGallery= (/*e*/ )=>{
    //const files = e.target.files;
    
    console.log("Gallery==>"+galleryFiles.length);
    
    const formData = new FormData();
   for(let i=0;i<galleryFiles.length;i++)
    {
      formData.append('file',galleryFiles[i]);
      console.log("formData append ==> "+galleryFiles[i] );
      formData.append('upload_preset',preset_key);
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
    .then(results =>
    {
      toast.success(`image ${i+1} uploaded successfully\n${results.data.secure_url}`)
      console.log(results.data.secure_url);
      setSelectedGameGallery(selectedGameGallery=>[...selectedGameGallery,{imageSource:results.data.secure_url,imageDesc:`test${i+1}`}])
      
    })
    .catch(error=>
    {
      toast.error(error.message);
    })
    }
    
  }
  const setCover =(e)=>{
    console.log("setCover==>"+e.target.files[0]);
    setImageCoverFile(e.target.files[0]);
    
  }
  const setGallery=(e)=>{
    setGalleryFiles(e.target.files);
  }
  useEffect(() => {
    console.log(`imageCoverFile changing: ${imageCoverFile}\ngalleryFiles changing: ${galleryFiles}`); 
  }, [imageCoverFile,galleryFiles]);


    return (
        <>
        <Header/>
        <ToastContainer/>
            <Container style={{alignSelf:'center',width:'100%',background:'rgba(255,255,255,0.95)',borderWidth:5,borderColor:"#000",marginTop:'2%',borderRadius:12}}>
           
           <Navbar bg="light" expand="lg" >
      <Container >
        <Navbar.Brand ></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>setAdminView("addGame")} >Add game</Nav.Link>
            <Nav.Link onClick={()=>setAdminView("editGames")}>Edit games</Nav.Link>
            <Nav.Link onClick={()=>setAdminView("editUsers")}>Edit users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
           {
            adminView ==="addGame" ? (<Form>
              <option>Select Genre</option>
              <Form.Select onChange={(e)=>{setSelectedGenre(e.target.value)}} aria-label="Default select example">
                
                {
                  allGenres.length > 0 &&
                  allGenres.map((genre) => (<option value={genre._id}>{genre.genreName}</option>))
                }
              </Form.Select>
              <p>{selectedGenre}</p>
                <Form.Control type="text" name="gameName" value={selectedGameName} onChange={(e)=>{setSelectedGameName(e.target.value)}} placeholder='Game name' style={{marginTop:10}}/>
                <Form.Control type="number" name="gamePrice" value={selectedGamePrice} onChange={(e)=>{setSelectedGamePrice(e.target.value)}} placeholder='Game price' style={{marginTop:10}}/>
                <Form.Control type="text" name="gameDesc" value={selectedGameDesc} onChange={(e)=>{setSelectedGameDesc(e.target.value)}} placeholder='Game description' style={{marginTop:10}}/>
                {/* <Form.Control type="text" name="gameRating" value={selectedGameRating} onChange={(e)=>{setSelectedGameRating(e.target.value)}} placeholder='Game rating' style={{marginTop:10}}/> */}
                <Form.Control type="date" name="gameReleaseDate" value={selectedGameReleaseDate} onChange={(e)=>{setSelectedGameReleaseDate(e.target.value)}} placeholder='Game release date' style={{marginTop:10}}/>
                {/* <Form.Control type="file" name="gameImageCover" value={selectedGameImage} onChange={(e)=>{setSelectedGameImage(e.target.value)}} placeholder='Game image' style={{marginTop:10}}/> */}
                <Form.Label  style={{marginTop:10}}>Game Cover</Form.Label>
                <Form.Control type="file" accept="image/*" name="gameImageCover" onChange={(e)=>{setCover(e)}} />
                
                {
                  selectedGameImage!==""  && (<><FormLabel>{selectedGameImage}</FormLabel><br/><Image src={`${selectedGameImage}`} style={{width:150,height:150}}></Image></>)
                }<br/>
                <Form.Label  style={{marginTop:10}}>Game Gallery</Form.Label>
               <Form.Control type="file" multiple accept="image/*" name="imageSource" onChange={(e)=>{setGallery(e)}} />
               {
                  selectedGameGallery.length > 0 && (selectedGameGallery.map(image=><><FormLabel>{image.imageSource}</FormLabel><br/><Image src={`${image.imageSource}`} style={{width:150,height:150,marginRight:2}}></Image><br/></>))
                }<br/>
                <Button style={{marginTop:10,marginBottom:5,width:'25%',}} onClick={uploadGameImages}>Upload images</Button>
                <br/>
                <Button variant='info'  style={{marginTop:10,marginBottom:5,width:'25%',}} onClick={addNewGame}>Add Game</Button>
              </Form>) :
              adminView === "editGames" ?(<>{
                games.length> 0 ? games.map((item)=> (<Col xl={3}><GameItem Delete= { () => {DeleteGameById(item._id)}} loadAllGames={loadAllGames} game={item} /></Col>)) : <p>no</p>
              } </>)
              :(<></>)
           }
            </Container>  
       


      
        </>
    )
}

export default AdminPage;