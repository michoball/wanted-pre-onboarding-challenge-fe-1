import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Todo = () => {
  return (
    <div className="todowrapper">
      <h1>Todo</h1>
      <div
        className="todoContainer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90vw",
        }}
      >
        <TodoList />
        <TodoForm />
      </div>
    </div>
  );
};

export default Todo;
