import React from "react";
import Card from "./TodoCard";
import Spinner from "../UI/Spinner";
import { useQuery } from "@tanstack/react-query";
import TodoService from "../service/todoService";

const TodoList = () => {
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: TodoService.getAllTodo,
    select: (data) =>
      data.data.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      ),
  });

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
