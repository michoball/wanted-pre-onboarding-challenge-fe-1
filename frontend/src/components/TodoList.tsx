import React from "react";
import Card from "./TodoCard";
import Spinner from "../UI/Spinner";
import useGetTodoQuery from "../hooks/services/queryies/useGetTodoQuery";

const TodoList = () => {
  const { useGetAllTodoQuery } = useGetTodoQuery();
  const { data: todos, isLoading } = useGetAllTodoQuery();

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
            update={todo.updatedAt}
            create={todo.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
