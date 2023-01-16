import { useContext, useState, useEffect, FormEvent } from "react";
import TodoContext from "../context/todoContext";
import useTodoMutation from "../hooks/services/mutations/useTodoMutation";
import useGetTodoQuery from "../hooks/services/queryies/useGetTodoQuery";

import style from "./TodoForm.module.css";

const TodoForm = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { todoEdit } = useContext(TodoContext);
  const { useAddTodoMutate, useUpdateTodoMutate } = useTodoMutation();
  const { useGetOneTodoQuery } = useGetTodoQuery();

  const { mutate: addTodoMutate } = useAddTodoMutate();
  const { mutate: updateTodoMutate } = useUpdateTodoMutate();
  const { data: todo } = useGetOneTodoQuery(todoEdit);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setContent("");
    if (todo) {
      const newtodo = {
        ...todo.data,
        title,
        content,
      };
      updateTodoMutate(newtodo);
      return;
    }
    addTodoMutate({ title, content });
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo.data.title);
      setContent(todo.data.content);
    }
  }, [todo]);

  return (
    <div className={style.todoForm}>
      <h3>make new todo</h3>
      <form onSubmit={submitHandler}>
        <label>제목</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Write a title"
        />
        <label>내용</label>
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Write a todo"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default TodoForm;
