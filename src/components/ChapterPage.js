import React, { useState } from 'react'
import './Home.css'
import './ChapterPage.css'

import TodoSidebar from './TodoSidebar'
import { BiCalendarAlt } from 'react-icons/bi'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { AiFillPlayCircle } from 'react-icons/ai'
import welcomeImage from '../img/illustrations/welcome.svg'

import { getCurrentDate } from '../date'
import ChapterDetailPage from './ChapterDetailPage'
import ChapterList from './ChapterList'

import db from '../firebase.js'

function ModulePage({ match, location }) {

    const [moduleModal, setModuleModal] = useState(false);

    const [modalModuleText, setModalModuleText] = useState('');

    const [selectedChapter, setSelectedChapter] = useState('');
    const [notesModal, setNotesModal] = useState(false);

    const [modalTitleText, setModalTitleText] = useState('');
    const [modalContent, setModalContent] = useState('');

    
    const add_chapter = (e) => {
        e.preventDefault()
        db.collection('chapter').add({
            module_id: match.params.id,
            title: modalModuleText,
        })
        setModalModuleText('');
        setModuleModal(false);
    }

    const add_note = (e) => {
        e.preventDefault();
        db.collection('notes').add({
            chapter_id: selectedChapter,
            title: modalTitleText,
            content: modalContent
        })
        setModalTitleText('');
        setModalContent('');
        setNotesModal(false);
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
                    {selectedChapter === '' ? <ChapterList module_id={match.params.id} modalModuleText={modalModuleText} setModalModuleText={setModalModuleText} setModuleModal={setModuleModal} setSelectedChapter={setSelectedChapter}/> : 
                    <ChapterDetailPage chapter_id={selectedChapter} modalTitleText={modalTitleText} setModalTitleText={setModalTitleText} modalContent={modalContent} setModalContent={setModalContent} setNotesModal={setNotesModal} />
                    }
                </div>

                <div className={"module-modal " + (moduleModal ? 'active' : '')}>
                    <div className="module-modal-panel">
                        <p>Create a new chapter</p>
                        <form>
                            <input type="text" placeholder="chapter name" onChange={(e) => setModalModuleText(e.target.value)} value={modalModuleText} />
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

                <div className={"module-modal " + (notesModal ? 'active' : '')}>
                    <div className="module-modal-panel">
                        <p>Create a new note</p>
                        <form>
                            <input type="text" placeholder="title" onChange={(e) => setModalTitleText(e.target.value)} value={modalTitleText} />
                            <input type="text" placeholder="note" onChange={(e) => setModalContent(e.target.value)} value={modalContent} />
                            <div className="actions">
                                <button type="submit" className="btn-secondary" onClick={add_note}>Add</button>
                                <button className="btn-danger" onClick={(e) => {
                                    e.preventDefault()
                                    setModalTitleText('')
                                    setModalContent('')
                                    setNotesModal(false)}
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
                 <TodoSidebar module_id={match.params.id} />
            </div>

        </div>
    )
}

export default ModulePage
