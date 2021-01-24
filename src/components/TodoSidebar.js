import React, { useEffect, useState } from 'react'
import './TodoSidebar.css'
import { AiFillPlayCircle } from 'react-icons/ai'
import db from '../firebase.js'

function TodoSidebar({ module_id }) {
   

    const [todos, setTodos] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        //console.log(db);
        db.collection('todos').onSnapshot(snapshot => {
            console.log(snapshot.docs.map(doc=>doc.data()));
            setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data()})))
        })
    }, []);

    return (
        <div className="todoSidebar">
            <div className="todos-subheading">
                <p>todos</p>
            </div>
            <div className="searchbar">
                <form>
                    <input onChange={(e) => setSearchText(e.target.value)} placeholder="Search"></input>
                </form>
            </div>

            {todos.length == 0 ? "Loading..." : ""}
            {todos.filter((val) => {
                if (searchText == ""){
                    return val
                }
                else if (val.todo.title.toLowerCase().includes(searchText.toLowerCase())){
                    return val
                }
            }).map((todo) => (
                <div key={todo.id} className="todo-card">
                  <p>{todo.todo.title}</p>
                  <i><AiFillPlayCircle color="#8882F1" size="1.2em" /></i>
                </div>
            ))}

            
        </div>
    )
}

export default TodoSidebar
