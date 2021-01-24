import React, { useEffect, useState } from 'react'
import './TodoSidebar.css'
import { AiFillPlayCircle } from 'react-icons/ai'
import db from '../firebase.js'

function TodoSidebar({ module_id }) {

    const [todos, setTodos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const add_todo = (e) => {
        e.preventDefault()
        db.collection('todos').add({
            module_id: module_id,
            todo: modalText,
        })
        setModalText('')
        setModal(false)
    }

    useEffect(() => {
        //console.log(db);
        db.collection('todos').where('module_id', '==', module_id).onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo})))
        })
    }, []);

    return (
        <>
        <div className="todoSidebar">
            <div className="todos-subheading">
                <p>todos</p>
                <button onClick={() => setModal(true)}>ADD</button>
            </div>
          <div className={"todo " + (modal ? 'active' : '')}>
                <div className="">
                    <form>
                        <input type="text" placeholder="todo" onChange={(e) => setModalText(e.target.value)} value={modalText} />
                        <div className="actions">
                            <button type="submit" className="btn-secondary" onClick={add_todo}>Add</button>
                            <button className="btn-danger" onClick={(e) => {
                                e.preventDefault()
                                setModalText('')
                                setModal(false)}
                            }>Cancel</button> 
                        </div>
                    </form>
                </div>
            </div>
                  <div className="searchbar">
                    <input onChange={(e) => {e.preventDefault(); setSearchText(e.target.value)}} placeholder="Search"></input>
                            
            </div>

            {todos.length == 0 ? "No todos found" : ""}
            {todos.filter((val) => {
                if (searchText == ""){
                    return val
                }
                else if (val.todo.toLowerCase().includes(searchText.toLowerCase())){
                    return val
                }
            }).map((todo) => (
                <div key={todo.id} className="todo-card">
                  <p>{todo.todo}</p>
                  <i><AiFillPlayCircle color="#8882F1" size="1.2em" /></i>
                </div>
            ))}

            

        </div>
        </>
    )
}

export default TodoSidebar
