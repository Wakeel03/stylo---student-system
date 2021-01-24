import React from 'react'
import './SideBar.css'
import { BiFileFind, BiCalendarAlt } from 'react-icons/bi'
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { IconContext } from 'react-icons/lib'
import { Link } from "react-router-dom"

function SideBar() {

    const linkStyle = {
        textDecoration: "none"
    }

    return (
        <IconContext.Provider value={{ color: "#8882F1", size: "1.2em" }}>
            <div className="sideBar">
                <div className="logo">STYLO</div>
                    <div className="menu-items">
                        <Link style={linkStyle} to="/"><div className="menu-item"><AiOutlineHome /><span>home</span></div></Link>
                        <div className="menu-item"><BiFileFind /><span>past paper</span></div>
                        <div className="menu-item"><BiCalendarAlt/><span>calendar</span></div>
                        <div className="menu-spacing"></div>
                        <div className="menu-item"><FiSettings /><span>settings</span></div>
                        <div className="menu-item"><AiOutlineInfoCircle /><span>about</span></div>
                    </div>
                <div className="user-menu-item">john doe</div>
            </div>
        </IconContext.Provider>
        
    )
}

export default SideBar
