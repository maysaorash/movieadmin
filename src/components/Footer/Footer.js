import React from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom'


export default function Footer() {
    const today = new Date().getFullYear();

    return (
        <div className='footer-main' style={{ height: "40px", backgroundColor: "#141414", color: "white" }}>
            <div className='footer-left'>
                <NavLink to='/privacypolicy' activeStyle={{color: 'red', textDecoration: 'none'}}>Privacy Policy</NavLink> &nbsp;
                <NavLink to="/termofuse" activeStyle={{color: 'red', textDecoration: 'none'}}>Term of Use</NavLink>
            </div>
            <div className='footer-right'>
                <p>Copyright {today} <span>CineTrail</span>All Rights Reserved</p>
            </div>

        </div>
    )
}