import { useContext, useState, useEffect, FormEvent } from "react";
import TodoContext from "../context/todoContext";
import style from "./TodoForm.module.css";

const TodoForm = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { addTodo, todoEdit, updateTodo } = useContext(TodoContext);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoEdit.edit && todoEdit.item) {
      const newtodo = {
        ...todoEdit.item,
        title,
        content,
      };
      updateTodo(newtodo);
    } else {
      addTodo({ title, content });
    }
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    if (todoEdit.edit && todoEdit.item) {
      setTitle(todoEdit.item.title);
      setContent(todoEdit.item.content);
    }
  }, [todoEdit]);

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
