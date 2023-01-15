import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import TodoContext from "../context/todoContext";
import TodoService from "../service/todoService";
import style from "./TodoCard.module.css";

interface CardProps {
  title: string;
  content: string;
  update: string;
  create: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ title, content, update, create, id }) => {
  const { editTodo } = useContext(TodoContext);
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: TodoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const editTodoHandler = () => {
    editTodo({ title, content, updatedAt: update, id, createdAt: create });
  };
  const deleteTodoHandler = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteMutate(id);
    }
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.buttons}>
        <button onClick={editTodoHandler}>edit</button>
        <button onClick={deleteTodoHandler}>delete</button>
      </div>
      <header>{title}</header>
      <p className={style.content}>{content}</p>
      <p className={style.date}>{update.split("T")[0]}</p>
    </div>
  );
};

export default Card;
