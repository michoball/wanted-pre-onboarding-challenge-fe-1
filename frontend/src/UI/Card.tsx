import React, { useContext } from "react";
import TodoContext from "../context/todoContext";
import style from "./Card.module.css";

interface CardProps {
  title: string;
  content: string;
  date: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ title, content, date, id }) => {
  const { editTodo, deleteTodo } = useContext(TodoContext);
  const editTodoHandler = () => {
    editTodo({ title, content, updatedAt: date, id });
  };
  const deleteTodoHandler = () => {
    deleteTodo(id);
  };
  return (
    <div className={style.cardContainer}>
      <div className={style.buttons}>
        <button onClick={editTodoHandler}>edit</button>
        <button onClick={deleteTodoHandler}>delete</button>
      </div>
      <header>{title}</header>
      <p className={style.content}>{content}</p>
      <p className={style.date}>{date.split("T")[0]}</p>
    </div>
  );
};

export default Card;
