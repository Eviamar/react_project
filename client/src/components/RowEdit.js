import React,{useState,useEffect} from 'react';
import {Button,Container,Row,Col,Form,Card ,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {FcDeleteRow} from 'react-icons/fc';
import moment from 'moment';

const  RowEdit = props =>
{
    
    const [title,setTitle] = useState(props.row.title);
    const [review,setReview] = useState(props.row.review);

    return(
    <>
    <td>{props.row.tid}</td>
    <td><Form.Control type='text' placeholder='Type your title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/></td>
    <td><Form.Control type='text' placeholder='Type your review' value={review} onChange={(e)=>{setReview(e.target.value)}}/></td>
    <td>{moment(Date.now()).format('MMMM Do YYYY')}</td>
    <td><Button onClick={()=>{props.delete(props.row.tid)}} variant='danger'><FcDeleteRow size={25}></FcDeleteRow></Button></td>

    </>
    )
}

export default RowEdit;