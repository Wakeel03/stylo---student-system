import React, { useEffect, useState } from 'react'
import './Home.css'
import TodoSidebar from './TodoSidebar'
import { BiCalendarAlt } from 'react-icons/bi'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { AiFillBook, AiFillPlayCircle } from 'react-icons/ai'
import welcomeImage from '../img/illustrations/welcome.svg'
import { IoChevronBackCircleSharp, IoChevronForwardCircleSharp } from 'react-icons/io5'

import db from '../firebase.js'
import { getCurrentDate } from '../date'

import { Link } from "react-router-dom"
function Home() {
    
    const [modules, setModules] = useState([]);

    const [moduleModal, setModuleModal] = useState(false);

    const [modalModuleText, setModalModuleText] = useState('');

    useEffect(() => {
        //console.log(db);
        db.collection('modules').onSnapshot(snapshot => {
            //console.log(snapshot.docs.map(doc=>doc.data()));
            setModules(snapshot.docs.map(doc => ({ id: doc.id, module_data: doc.data()})))
        })
    }, []);

    //timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //db.collection('modules').orderBy('timestamp', 'desc').onSnapshot(snapshot => {})
    const add_module = (e) => {
        e.preventDefault()
        db.collection('modules').add({
            title: modalModuleText,
        })
        setModalModuleText('');
        setModuleModal(false);
    }

    const deleteModule = (id) => {
        db.collection('modules').doc(id).delete()
    }

    const linkStyle = {
        textDecoration: "none",
        marginLeft: "14px",
        marginRight: "auto",
    }

    return (
        <div className="home">
            <div className="center">
                    <div className="welcome-panel">
                    <div className="welcome-panel-info">
                        <h2>Welcome John</h2>
                        <p>{ getCurrentDate() }</p>
                    </div>
                    <img src={welcomeImage}></img>
                </div>


                <div className="next-task-panel">
                    <div className="next-task-panel-navigation">
                        <i><IoChevronBackCircleSharp color="#8882F1" size="1.2em"/></i>
                        <i><IoChevronForwardCircleSharp color="#8882F1" size="1.2em"/></i>
                    </div>
                    <BiCalendarAlt color= "#8882F1" size="2em" />
                    <h2>Revise Add Maths</h2>
                    <p>24 Dec 2020</p>
                    <p>2:30 pm</p>
                    <div className="next-task-panel-actions">
                        <i><MdModeEdit color="#8882F1" /></i>
                    </div>
                </div>

                
                <div  className="modules-panel">
                    <div className="modules-sub-heading">
                        <h2>modules</h2>
                        <button className="btn_add" onClick={() => setModuleModal(true)}>ADD</button>
                    </div>
                    <div className="module-cards">
                        {modules.length == 0 ? "Loading..." : ""}
                        {modules.map((module) => (
                            <div key={module.id} className="module-card">
                                <i><AiFillBook color="#8882F1" /></i>
                                <Link style={linkStyle} to={{pathname: `/module/${module.id}`, state: {module: module}}}><h2>{module.module_data.title}</h2></Link>
                                <i><MdModeEdit color="#8882F1" /></i>
                                <i onClick={() => deleteModule(module.id)}><MdDelete color="#E42121" /></i>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={"module-modal " + (moduleModal ? 'active' : '')}>
                    <div className="module-modal-panel">
                        <p>Create a new module</p>
                        <form>
                            <input type="text" placeholder="module name" onChange={(e) => setModalModuleText(e.target.value)} value={modalModuleText} />
                            <div className="actions">
                                <button type="submit" className="btn-secondary" onClick={add_module}>Add</button>
                                <button className="btn-danger" onClick={(e) => {
                                    e.preventDefault()
                                    setModalModuleText('')
                                    setModuleModal(false)}
                                }>Cancel</button> 
                            </div>
                        </form>
                        
                        
                    </div>
                </div>

                <div className="see-later-panel">
                    <div className="modules-sub-heading">
                        <h2>see later</h2>
                        <h2>+</h2>
                    </div>
                    <div className="see-later-cards">
                        <div className="see-later-card">
                            <div className="see-later-info">
                                <p>MIT Lecture 101</p>
                                <div className="see-later-card-type">
                                    <p>video</p>
                                </div>
                            <div className="see-later-card-actions">
                                    <i><MdModeEdit color="#8882F1" /></i>
                                    <i><MdDelete color="#E42121" /></i>
                                </div>
                            </div>
                            <div className="see-later-play-btn">
                                <div className="play-btn">
                                    <i><AiFillPlayCircle color="#ffffff" size="2em" /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="todo-sidebar">
                 <TodoSidebar module_id="" />
            </div>

        </div>
    )
}

export default Home
