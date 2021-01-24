import React, { useEffect, useState } from 'react'
import './Home.css'
import './ModulePage.css'

import TodoSidebar from './TodoSidebar'
import { BiCalendarAlt } from 'react-icons/bi'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { AiFillBook, AiFillPlayCircle } from 'react-icons/ai'
import welcomeImage from '../img/illustrations/welcome.svg'

import db from '../firebase.js'
import { getCurrentDate } from '../date'
import { Link } from "react-router-dom"

function ModulePage({ match, location }) {
    
    const [chapters, setChapters] = useState([]);

    const [moduleModal, setModuleModal] = useState(false);

    const [modalModuleText, setModalModuleText] = useState('');

    useEffect(() => {
        //console.log(db);
        db.collection('chapter').where('module_id', '==', match.params.id).onSnapshot(snapshot => {
            //console.log(snapshot.docs.map(doc=>doc.data()));
            setChapters(snapshot.docs.map(doc => ({ id: doc.id, chapter_data: doc.data()})))
        })
    }, []);

    //timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //db.collection('modules').orderBy('timestamp', 'desc').onSnapshot(snapshot => {})
    const add_chapter = (e) => {
        e.preventDefault()
        db.collection('chapter').add({
            module_id: match.params.id,
            title: modalModuleText,
        })
        setModalModuleText('');
        setModuleModal(false);
    }

    const deleteChapter = (id) => {
        db.collection('chapter').doc(id).delete()
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
                        <h2>{ location.state.module.module_data.title }</h2>
                        <p>{ getCurrentDate() }</p>
                    </div>
                    <img src={welcomeImage}></img>
                </div>


                <div className="right-panel">
                    <div className="marks-record-panel">
                        <i><BiCalendarAlt color="#8882F1" size="1.2em"/></i>
                        <p>Marks Record</p>
                    </div>
                    <div className="create-note-panel">
                        <i><BiCalendarAlt color="#8882F1" size="1.2em"/></i>
                        <p>Create Note</p>
                    </div>
                </div>

                
                <div  className="modules-panel">
                    <div className="modules-sub-heading">
                        <h2>modules</h2>
                        <button className="btn_add" onClick={() => setModuleModal(true)}>ADD</button>
                    </div>
                    <div className="module-cards">
                        {chapters.length == 0 ? "Loading..." : ""}
                        {chapters.map((chapter) => (
                            <div key={chapter.id} className="module-card">
                                <i><AiFillBook color="#8882F1" /></i>
                                <Link style={linkStyle} to={`/module/chapter/${chapter.id}`}><h2>{chapter.chapter_data.title}</h2></Link>
                                <i><MdModeEdit color="#8882F1" /></i>
                                <i onClick={() => deleteChapter(module.id)}><MdDelete color="#E42121" /></i>
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
                                <button type="submit" className="btn-secondary" onClick={add_chapter}>Add</button>
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

export default ModulePage
