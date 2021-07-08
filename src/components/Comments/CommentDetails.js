import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import ReactPlayer from "react-player";
export default function CommentDetails() {
    const { id } = useParams();
    const [data,setData]=useState([])
    const [noMessage, setNomessage]=useState("You do not have any blocked messages")
    
 useEffect(() => {
     axios
     .get(`https://movieapp-server.herokuapp.com/comments/${id}`)
     .then((res)=>{
         console.log(res.data.data)
         setData(res.data.data)
          })
            .catch((err) => {
        console.log(err);
    });
 }, [])
    return (
        < div>
        {!data.isActive?
       <h2> Comment <span style={{color:'red'}}>{data.title}</span> created at <span style={{color:'red'}}>{data.createdAt && data.createdAt.slice(0,10)}</span> was blocked. Reason: <span style={{color:'red'}}>{data.reasonToBlock}</span></h2>
       
       :<h2>{data.content}</h2>
    }
     
            <Link to="/commentlist" className="submit-btn back-to-trailers-btn" ><button className="submit-btn back-to-trailers-btn"> Back to Comment List</button></Link>  
                
        </div>
    )
}
