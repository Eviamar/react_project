import React,{useState,useEffect} from 'react';
import { Button, Container, Row, Col, Form, Card, Table, Navbar, Nav, Image, FormLabel, FloatingLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import axios from 'axios';
import GameItem from './../components/GameItem';
import UserItem from './../components/UserItem';
import GameComponent from '../components/GameComponent';

const AdminPage = props => {
  const user = JSON.parse(localStorage.getItem("user"));

  const baseUrl = 'http://localhost:3001/api';
  const [games,setAllGames] = useState([]);
  const [users,setUsers] = useState([]);
  const [allGenres,setAllGenres] = useState([]);
  const [genreName,setGenreName] = useState("");
  const [genreDesc,setGenreDesc] = useState("");
  const [selectedGenre,setSelectedGenre] = useState("Select Genre");
  const [selectedGameName,setSelectedGameName] = useState("");
  const [selectedGamePrice,setSelectedGamePrice] = useState("");
  const [selectedGameDesc,setSelectedGameDesc] = useState("");
  const [selectedGameImage,setSelectedGameImage] = useState("");
  const [selectedGameGallery,setSelectedGameGallery] = useState([]);
  //const [selectedGameRating,setSelectedGameRating] = useState("");
  const [selectedGameReleaseDate,setSelectedGameReleaseDate] = useState("");
  const [addBtn,setAddBtn] = useState(true);
  const [genreEditBtn,setGenreEditBtn] = useState(true);
  const [imageCoverFile,setImageCoverFile] =  useState(FileList | null);
  
  const [galleryFiles,setGalleryFiles] = useState(FileList | null);

  const [adminView,setAdminView] = useState("addGame");

  const preset_key = 'irkdzxu3';
  const cloud_name ='doaxabeif';

  useEffect(()=>{
    loadAllGames();
    loadAllGenres();
    loadAllUsers();
  },[]);

  // const AddNUpload = async ()=>
  // {
  
  //     const isUploaded = await uploadGameImagesTest();
  //     console.log("isUploaded===>"+isUploaded);
  //     if(isUploaded)
  //       addNewGame();
  //     else
  //       toast.error("failed to upload");
   
  // }
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
      setAddBtn(!addBtn);
      setSelectedGameImage("")
      setSelectedGameGallery([])
      setSelectedGameName('')
      setSelectedGameDesc('')
     // setSelectedGameRating('')
      setSelectedGamePrice('')
      setSelectedGameReleaseDate('')
      setSelectedGameImage('')
      setSelectedGenre("Select Genre");
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
  
  const loadAllUsers = async()=>
  {
    const response = await fetch(baseUrl+"/account/readAllUsers",{method:'GET'});
    const data = await response.json();
    setUsers(data.message);
    //console.log(users);

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



  const DeleteGameById = async(gid)=>{

    const game = await fetch(baseUrl+"/readGameById/"+gid,{method:'GET'});
    const gameData = await game.json();
    // console.log("deleteGame==>"+JSON.stringify(gameData.message.gameImageCover))
    // console.log("deleteGame2==>"+JSON.stringify(gameData.gameName))
  
    const formData = new FormData();
    formData.append('folder',"Games/"+gameData.message.gameName);
    
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy/`,formData)
    .then(imageDel=>{
      toast.success("image cover deleted");

      // for(let i=0;i<gameData.message.gameGallery.length;i++){
      //   axios.delete(gameData.message.gameGallery[i].imageSource).then(gallery=>{
      //     toast.success(`image ${i+1}/${gameData.message.gameGallery.length} deleted`);
      //   }).catch(error=>{
      //     toast.error("galleryDel=>"+error.message);    
      //     return;
      //   })
      // }
     
    }).catch(error=>{
      toast.error("coverDel=>"+error.message);
      
      return;
    })
   
     try{
      const response = await fetch(baseUrl+"/deleteGame/"+gid,{method:'DELETE'});
      //const data = await response.json();
      toast.success(`${gameData.message.gameName} has been deleted`)
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
  // const uploadGameImagesTest = async()=>
  // {
  //   let cover = "";
  //   let gallery = []
  //   const formData = new FormData();
  //   formData.append('file',imageCoverFile);
  //     formData.append('upload_preset',preset_key);
  //     axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
  //   .then(async results =>
  //   {
  //     toast.success(`image cover successfully\n${results.data.secure_url}`)
  //     cover = await results.data.secure_url;
  //     //console.log(`Image Cover ===> ${selectedGameImage}`);
  //     for(let i=0;i<galleryFiles.length;i++)
  //     {
  //     formData.append('file',galleryFiles[i]);
  //     console.log("formData append ==> "+galleryFiles[i] );
  //     formData.append('upload_preset',preset_key);
  //     axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
  //     .then(async results =>
  //     {
  //     toast.success(`image ${i+1} uploaded successfully\n${results.data.secure_url}`)
  //     gallery.push(await results.data.secure_url);
  //     console.log("gallery image"+i+"==> "+selectedGameGallery[i]);
  //     })
  //   .catch(error=>
  //     {
  //     toast.error(error.message);
  //     return false;
  //     })
  //   }
  //   })
  //   .catch(error=>
  //   {
  //     toast.error(error.message);
  //     return false;
  //   })
  //   setSelectedGameGallery(gallery);
  //   setSelectedGameImage(cover);
  //   return true;
  // }



  const uploadGameImages = async ()=>{
    //upload cover image
    if(galleryFiles===0 || imageCoverFile===0){
      toast.error("Images must be selected");
      return;
    }

    const formData = new FormData();
    formData.append('folder',"Games/"+selectedGameName);
      formData.append('file',imageCoverFile);
      formData.append('upload_preset',preset_key);
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,formData)
    .then(results =>
    {
      toast.success(`image cover successfully\n${results.data.secure_url}`)
      setSelectedGameImage(results.data.secure_url);
      console.log(`Image Cover ===> ${selectedGameImage}`);
      setAddBtn(!addBtn);
    })
    .catch(error=>
    {
      toast.error(error.message);
    })
    //upload gallery
    const formData2 = new FormData();
    formData2.append('folder',"Games/"+selectedGameName);
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
    setAddBtn(false);

      
      setImageCoverFile(FileList | null);
      setGalleryFiles(FileList | null);
    
  }

  // const uploadGameCover= (/*e*/)=>{
  //   //const file = e.target.files[0];
  //   //setImageCoverFile(file);
  //   console.log("ImageCover==>"+imageCoverFile);

  //   const formData = new FormData();
  //     formData.append('file',imageCoverFile);
  //     formData.append('upload_preset',preset_key);
  //     axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
  //   .then(results =>
  //   {
  //     toast.success(`image cover successfully\n${results.data.secure_url}`)
  //     console.log("Image Cover ===> "+results.data.secure_url)
  //     setSelectedGameImage(results.data.secure_url) 
  //   })
  //   .catch(error=>
  //   {
  //     toast.error(error.message);
  //   })
    
    
  // }
  // const uploadGallery= (/*e*/ )=>{
  //   //const files = e.target.files;
    
  //   console.log("Gallery==>"+galleryFiles.length);
    
  //   const formData = new FormData();
  //  for(let i=0;i<galleryFiles.length;i++)
  //   {
  //     formData.append('file',galleryFiles[i]);
  //     console.log("formData append ==> "+galleryFiles[i] );
  //     formData.append('upload_preset',preset_key);
  //     axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
  //   .then(results =>
  //   {
  //     toast.success(`image ${i+1} uploaded successfully\n${results.data.secure_url}`)
  //     console.log(results.data.secure_url);
  //     setSelectedGameGallery(selectedGameGallery=>[...selectedGameGallery,{imageSource:results.data.secure_url,imageDesc:`test${i+1}`}])
      
  //   })
  //   .catch(error=>
  //   {
  //     toast.error(error.message);
  //   })
  //   }
    
  // }
  const setCover =(e)=>{
    console.log("setCover==>"+e.target.files[0]);
    setImageCoverFile(e.target.files[0]);
    
  }
  const setGallery=(e)=>{
    setGalleryFiles(e.target.files);
  }
  // useEffect(() => {
  //   console.log(`imageCoverFile changing: ${imageCoverFile}\ngalleryFiles changing: ${galleryFiles}`); 
  // }, [imageCoverFile,galleryFiles]);

const EditGenreBtn =(e) =>
{
  allGenres.map((x)=>{if(e===x._id) {setGenreName(x.genreName);setGenreDesc(x.genreDesc);}})
  setGenreEditBtn(!genreEditBtn)
 
}
const AddGenre=async()=>{
  const response = await fetch(baseUrl+"/createGenre",{method:'POST',headers:{'Content-Type':'application/json'},
          body : JSON.stringify({
          genreName:genreName,
          genreDesc:genreDesc
        })  
        
      }
      );
      //console.log("selectedGameGallery===> "+selectedGameGallery);
      const data = await response.json();
    //   console.log(data);
    //   console.log(selectedGameReleaseDate)
    
      toast.success(`Genre ${data.message.genreName} Added`);
      loadAllGenres();
      setSelectedGenre("Select Genre");
}

const updateGenre = async()=>{
  const response = await fetch(baseUrl+"/updateGenre/"+selectedGenre,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    genreName: genreName,
    genreDesc: genreDesc,
   
  })});
  const data = await response.json(); 
  setGenreEditBtn(!genreEditBtn)
  loadAllGenres();
  setSelectedGenre("Select Genre");
}

const changeView=(e)=>{
  setAddBtn(true);
  setGenreEditBtn(true);
  setSelectedGenre("Select Genre");
switch(e){
  case "addGame":
    setAdminView("addGame");
    break;
    case "editGames":
    setAdminView("editGames");
    break;
    case "GenrePage":
    setAdminView("GenrePage");
    break;
    case "editUsers":
    setAdminView("editUsers");
    break;
    default:
      setAdminView("addGame");
    break;
}
}


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
            <Nav.Link name="addGame" onClick={(e)=>{changeView(e.target.name)}} >Add game</Nav.Link>
            <Nav.Link name="editGames" onClick={(e)=>{changeView(e.target.name)}}>Edit games</Nav.Link>
            <Nav.Link name="GenrePage" onClick={(e)=>{changeView(e.target.name)}}>Game Genres</Nav.Link>
            <Nav.Link name="editUsers" onClick={(e)=>{changeView(e.target.name)}}>Edit users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
           {
          adminView ==="addGame" ? 
            (<><h3>Add new game</h3>
            <Row style={{width:'100%',}}>
              <Col >
            <Form >
              <option>Select Genre</option>
              <Form.Select onChange={(e)=>{setSelectedGenre(e.target.value)}} aria-label="Default select example">
              <option selected>Select Genre</option>
                
                {
                  allGenres.length > 0 &&
                  allGenres.map((genre) => (<option value={genre._id}>{genre.genreName}</option>))
                }
              </Form.Select>
              <Form.Text id="passwordHelpBlock" muted>{selectedGenre}</Form.Text>
                <FloatingLabel label="Game name"><Form.Control type="text" name="gameName" value={selectedGameName} onChange={(e)=>{setSelectedGameName(e.target.value)}} placeholder='Game name' style={{marginTop:10}}/></FloatingLabel>
                <FloatingLabel label="Game price"><Form.Control type="number" name="gamePrice" value={selectedGamePrice} onChange={(e)=>{setSelectedGamePrice(e.target.value)}} placeholder='Game price' style={{marginTop:10}}/></FloatingLabel>
                <textarea type="text" name="gameDesc" value={selectedGameDesc} onChange={(e)=>{setSelectedGameDesc(e.target.value)}} placeholder='Game description' style={{marginTop:10,width:'100%'}}/>
                {/* <Form.Control type="text" name="gameRating" value={selectedGameRating} onChange={(e)=>{setSelectedGameRating(e.target.value)}} placeholder='Game rating' style={{marginTop:10}}/> */}
                <FloatingLabel label="Game release date"><Form.Control type="date" name="gameReleaseDate" value={selectedGameReleaseDate} onChange={(e)=>{setSelectedGameReleaseDate(e.target.value)}} placeholder='Game release date' style={{marginTop:10}}/></FloatingLabel>
                {/* <Form.Control type="file" name="gameImageCover" value={selectedGameImage} onChange={(e)=>{setSelectedGameImage(e.target.value)}} placeholder='Game image' style={{marginTop:10}}/> */}
                <Form.Label  style={{marginTop:10}}>Game Cover</Form.Label>
                <Form.Control type="file" accept="image/*" name="gameImageCover" onChange={(e)=>{setCover(e)}} />
                
                {
                  selectedGameImage!==""  && (<><Image title={selectedGameImage} src={`${selectedGameImage}`} style={{width:150,height:150}}></Image></>)
                }<br/>
                <Form.Label  style={{marginTop:10}}>Game Gallery</Form.Label>
               <Form.Control type="file" multiple accept="image/*" name="imageSource" onChange={(e)=>{setGallery(e)}} />
               
               {
                  selectedGameGallery.length > 0 && (selectedGameGallery.map(image=><><Image title={image.imageSource}src={`${image.imageSource}`} style={{width:150,height:150,marginRight:2}}></Image></>))
                }<br/>
                <Row style={{justifyContent:'space-evenly'}}>
                <Button disabled={!addBtn} style={{marginTop:10,marginBottom:5,width:'25%',}} onClick={uploadGameImages}>1. Upload images</Button>
                
                <Button disabled={addBtn} variant='info'  style={{marginTop:10,marginBottom:5,width:'25%',}} onClick={addNewGame} >2. Add Game</Button>
                </Row>
              </Form>
              </Col>
              </Row>
              </>) :
            adminView === "editGames" ?
              (<><h3>Games</h3><Row>{
                games.length> 0 ? games.map((item)=> (<Col xl={3}><GameItem Delete= { () => {DeleteGameById(item._id)}} loadAllGames={loadAllGames} game={item} /></Col>)) : <p>no</p>
              }</Row> </>)
              :  
            adminView === "editUsers" ?
              (
              <>
              <h3>Users</h3>
              <Row>
              {
               users.length > 0 && users.map((userItem)=>(<Col xl={3}><UserItem user={userItem}/></Col>))
              }
              </Row>
              </>
              ) :
              adminView==="GenrePage" && (
              <>
              <Row style={{justifyContent:'space-evenly'}}>
                <Col xl={4} style={{padding:10,background:'rgba(155,155,155,0.3)',borderWidth:1,borderRadius:18}}><h3>Add Genre</h3>
               <Form>
      <Form.Group style={{marginBottom:10}}>
        <Form.Control type="text" placeholder="Enter genre name" onChange={(e)=>setGenreName(e.target.value)} />
      </Form.Group>
      <Form.Control type="textarea" placeholder="Type genre description" onChange={(e)=>setGenreDesc(e.target.value)} />
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary"  onClick={AddGenre}>Add</Button>
    </Form>
    </Col>
    <Col xl={5} style={{padding:10,background:'rgba(155,155,155,0.3)',borderWidth:1,borderRadius:18}}>
      <h3>Edit Genre</h3>
      {
        genreEditBtn ? (<><Form.Select  style={{marginBottom:10}} onChange={(e)=>{setSelectedGenre(e.target.value)}} aria-label="Default select example">
        <option selected>Select Genre</option>
          
          {
            allGenres.length > 0 &&
            allGenres.map((genre) => (<option value={genre._id}>{genre.genreName}</option>))
          }  
        </Form.Select>
        <Button onClick={()=>EditGenreBtn(selectedGenre)}>Edit</Button></>) :(<>
          <Form.Group style={{marginBottom:10}}>
<Form.Control type="text" value={genreName} onChange={(e)=>setGenreName(e.target.value)} placeholder="Enter genre name" />
</Form.Group>
<Form.Control type="textarea" value={genreDesc} onChange={(e)=>setGenreDesc(e.target.value)} placeholder="genre description" />
<Form.Group className="mb-3" controlId="formBasicCheckbox">
</Form.Group>
<Row style={{justifyContent:'space-evenly'}}>
          <Button variant="dark" onClick={()=>setGenreEditBtn(!genreEditBtn)} style={{width:'25%'}}>Back</Button><Button style={{width:'25%'}} onClick={updateGenre}>Save</Button></Row>
        </>)
      }
      

      </Col>
      </Row>
             </>
                
                )
             
              
           }
            </Container>  
       


      
        </>
    )
}

export default AdminPage;