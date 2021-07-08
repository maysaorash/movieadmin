import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import ReactPlayer from "react-player";


export default function RatingDetails() {


    const { id } = useParams();
    const [data,setData]=useState([])
 useEffect(() => {
     axios
     .get(`https://movieapp-server.herokuapp.com/trailers/${id}`)
     .then((res)=>{
         
         setData(res.data)
          })
            .catch((err) => {
        console.log(err);
    });
 }, [])



    return (
        < div>
         <h2> {data.description}</h2>
        <Link to="/ratings" className="submit-btn back-to-trailers-btn" ><button className="submit-btn back-to-trailers-btn"> Back to Rating List</button></Link>  

                
        </div>
    )
}