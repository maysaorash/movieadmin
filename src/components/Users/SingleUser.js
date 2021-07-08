import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css'
import { AiOutlineEdit,AiFillDelete } from "react-icons/ai";
// import Modal from 'react-modal';
// Modal.setAppElement('#root');

export default function SingleUser({user}) {

    const [profileImageUrl, setProfileImageUrl] = useState('');
    // const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
        axios
            .get(`https://movieapp-server.herokuapp.com/medias/${user.profileImageId}`)
            .then((res) => {
                           console.log(res.data.url)
                           setProfileImageUrl(res.data.url); 
                       })
            .catch((err) => {
                           console.log(err);
                       });
        
	}, [user.profileImageId]);

    
  const deleteUser=(id)=>{
    
      console.log(id)
      axios
      .delete(`https://movieapp-server.herokuapp.com/users/${id}`)
      .then((res) => {
                     
        window.location.reload()
                 })
      .catch((err) => {
                     console.log(err);
                 });

  }



    return (
        <div className="single-user">
            
            <div className="single-user-items user-pic-container">
               <img className="user-pic" src={profileImageUrl}  alt="img"/>
            </div>
           {/* <div className="single-user-items user-pic-container"><img className="user-pic" src="https://picsum.photos/100" alt="profile img"/></div> */}
           <div className="single-user-items user-firstname">{user.firstname} {user.lastname}</div>
           <div className="single-user-items user-lastname">{user.email} </div>
           <div className="single-user-items user-country">{user.country}</div>
           <div className="single-user-items user-date">{user.createdAt.slice(0,10)}</div>
           <div className="actions">
               <div className=" action-items edit-action" ><AiOutlineEdit/></div>
               <div className="action-items delete-action" onClick={()=>deleteUser(user._id)}><AiFillDelete/></div>
           </div>
     
        </div>
    )
}
