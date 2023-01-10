import React, { useContext } from "react";
import TodoContext from "../context/todoContext";
import Card from "../UI/Card";
import Spinner from "../UI/Spinner";

const TodoList = () => {
  const { todos, isLoading } = useContext(TodoContext);

  if (!isLoading && (!todos || todos.length === 0)) {
    return <p>No todos Yet</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="listContainer">
      <h3>TodoList</h3>
      <div className="lists">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            date={todo.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
