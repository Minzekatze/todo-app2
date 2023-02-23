import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import list from "./list.png";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(storedTodos);
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function editTodo(newTodo) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === newTodo.id);
    todo.name = newTodo.name;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    //our stuff
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center">
          <h2>
            Do It List
            <img src={list} alt="list-logo" style={{ width: 50, height: 50 }} />
          </h2>

          <div className="d-flex align-items-center" id="add-section">
            <input
              className=""
              id="new-item"
              placeholder="Enter new item"
              ref={todoNameRef}
              type="text"
            />
            <button className="button" onClick={handleAddTodo}>
              +
            </button>
            <button className="button" onClick={handleClearTodo}>
              -
            </button>
          </div>
          <div className="justify-content-start" id="list-section">
            <div className="todoCount">
              {" "}
              {todos.filter((todo) => !todo.complete).length} left to do
            </div>
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              id="todo-list"
              editTodo={editTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
