import React, { useEffect, useState } from 'react'
import db from '../firebase.js'
import './ChapterPage.css'

import { AiFillBook} from 'react-icons/ai'

import { MdModeEdit, MdDelete } from 'react-icons/md'
function ChapterList({ module_id, modalModuleText, setModalModuleText, setModuleModal, setSelectedChapter }) {

    const [chapters, setChapters] = useState([])

    useEffect(() => {
        //console.log(db);
        db.collection('chapter').where('module_id', '==', module_id).onSnapshot(snapshot => {
            //console.log(snapshot.docs.map(doc=>doc.data()));
            setChapters(snapshot.docs.map(doc => ({ id: doc.id, chapter_data: doc.data()})))
        })
    }, []);

    //timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //db.collection('modules').orderBy('timestamp', 'desc').onSnapshot(snapshot => {})
    

    const deleteChapter = (id) => {
        db.collection('chapter').doc(id).delete()
    }

    return (
        <>
        <div className="modules-sub-heading">
            <h2>chapters</h2>
            <button className="btn_add" onClick={() => setModuleModal(true)}>ADD</button>
        </div>
        <div className="module-cards">
            {chapters.length == 0 ? "No chapters found" : ""}
            {chapters.map((chapter) => (
                <div key={chapter.id} className="module-card">
                    <i><AiFillBook color="#8882F1" /></i>
                    <h2 onClick={() => setSelectedChapter(chapter.id)}>{chapter.chapter_data.title}</h2>
                    <i><MdModeEdit color="#8882F1" /></i>
                    <i onClick={() => deleteChapter(module.id)}><MdDelete color="#E42121" /></i>
                </div>
            ))}
        </div>

        </>
    )
}

export default ChapterList
