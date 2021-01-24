import React, {useEffect, useState} from 'react'
import './ChapterPage.css'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { AiFillBook } from 'react-icons/ai'
import db from '../firebase.js'

function ChapterDetailPage({chapter_id, modalTitleText, setModalTitleText, modalContent, setModalContent, setNotesModal}) {

    const [chapter, setChapter] = useState('');
    const [notes, setNotes] = useState([]);

    
    useEffect(() => {
         db.collection('chapter').doc(chapter_id).get().then((doc) => {
            if (doc.exists) setChapter(doc.data().title)
            console.log(doc.title)
        }).catch((error) => console.log("Error getting chapter: ", error))
        
        db.collection('notes').where('chapter_id', '==', chapter_id).onSnapshot(snapshot => {
            setNotes(snapshot.docs.map(doc => ({ id: doc.id, note_data: doc.data()})))
        })
    }, [])

    return (
        <>
        <div className="modules-sub-heading">
            <h2>{chapter}</h2>
            <button className="btn_add" onClick={() => setNotesModal(true)}>ADD</button>
        </div>
        <div className="module-cards">
            {notes.length == 0 ? "No notes found" : ""}
            {notes.map((note) => (
                <div key={note.id} className="module-card">
                    <i><AiFillBook color="#8882F1" /></i>
                    <h2>{note.note_data.title}</h2>
                    <i><MdModeEdit color="#8882F1" /></i>
                    <i><MdDelete color="#E42121" /></i>
                </div>
            ))}
        </div>
        </>
    )
}

export default ChapterDetailPage
