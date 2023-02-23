import React from "react";
import "./style.css";

export default function Todo({ todo, toggleTodo, editTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleTodoEdit() {
    const newText = prompt(`You are editing`, todo.name);
    if (newText) {
      const newTodo = { ...todo, name: newText };
      editTodo(newTodo);
    }
  }

  return (
    //<div>
    <li>
      <label>
        <input
          className="checkBox"
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </label>
      <button onClick={handleTodoEdit}>edit</button>
    </li>
    // </div>
  );
}
