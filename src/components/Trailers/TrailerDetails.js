import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPlayer from "react-player";
import './trailers.css'

export default function TrailerDetails() {
   
    const { id } = useParams();
    const [trailer,setTrailer]=useState([])
 useEffect(() => {
     axios
     .get(`https://movieapp-server.herokuapp.com/trailers/${id}`)
     .then((res)=>{
         setTrailer(res.data)
     })
     .catch((err) => {
        console.log(err);
    });
 }, [])
    return (
        < div>
            <div className="player-wrapper">
                <ReactPlayer 
                    url={trailer.trailerUrl}
                    width="100%"
                    height="100%"
                    className="react-player"
                     controls={true}
                />
            </div>
            <div style={{marginLeft:"20px",marginRight:"20px"}}>
                <h1>{trailer.title}&nbsp;&nbsp;
                            <span className="trailer-detail-span">{trailer.year}</span>&nbsp;&nbsp;
                            <span className="trailer-detail-span">{trailer.ageRestriction}+</span>&nbsp;&nbsp;
                            {trailer.type==="movie" ? <span className="trailer-detail-span">{trailer.duration}</span>
                            : <span className="trailer-detail-span">S{trailer.seasonNumber} E{trailer.episodeNumber}</span>
                            }                       
                </h1> 
                <p>{trailer.description}</p> 
            </div>
           
            <div className="trailerdetail-info-container">               
                <div> 
                    <h3>
                        Starring:{trailer.cast && trailer.cast.map((item,index)=><span className="trailer-detail-span-item">&nbsp;{item}
                          {index < trailer.cast.length-1 ? ', ': null}
                        </span>)} 
                    </h3>   
                    <h3>
                        Genre:{trailer.genre && trailer.genre.map((item,index)=><span className="trailer-detail-span-item">&nbsp;{item}
                        {index < trailer.genre.length-1 ? ', ': null}
                        </span>)} 
                    </h3> 
                    <h3>
                        Tags: {trailer.tags && trailer.tags.map((item,index)=><span className="trailer-detail-span-item">&nbsp;{item}
                        {index < trailer.tags.length-1 ? ', ': null}
                        </span>)}   
                    </h3> 
                    {trailer.type==="show" ? 
                    <div>
                        <h3>
                            Episode Title:&nbsp;<span className="trailer-detail-span-item">{trailer.episodeTitle}</span>
                        </h3> 
                        <h3>
                            Total Number of Seasons:&nbsp;<span className="trailer-detail-span-item">{trailer.totalSeasons}</span>
                         </h3>
                    </div> 
                    
                  :null}
                  <div className="trailerdetails-buttons-container">
                    <Link to="/trailers" className="submit-btn back-to-trailers-btn" ><button className="submit-btn back-to-trailers-btn"> Back to Trailer List</button></Link>  
                    {/* <button className="submit-btn edit-trailerdetails-btn">Edit Trailer Details</button> */}
                  </div>      
                </div>
                <div>
                    <h3>Movie Image</h3>
                    <img src={trailer.mediaId && trailer.mediaId.url} style={{width:"300px",height:"300px"}} alt="trailer-img"/>
                </div>
                <div>
                    <h3>Banner Image</h3>
                    <img src={trailer.bannerId && trailer.bannerId.url} style={{width:"300px",height:"300px"}} alt="banner-img"/>
                </div>      
                </div>         
        </div>
    )
}
