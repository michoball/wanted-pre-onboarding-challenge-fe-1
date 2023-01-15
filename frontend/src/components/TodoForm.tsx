import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState, useEffect, FormEvent } from "react";
import TodoContext from "../context/todoContext";
import TodoService from "../service/todoService";
import style from "./TodoForm.module.css";

const TodoForm = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const { todoEdit } = useContext(TodoContext);

  const { mutate: addMutate } = useMutation({
    mutationFn: TodoService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const { mutate: updateMutate } = useMutation({
    mutationFn: TodoService.updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setContent("");

    if (todoEdit.edit && todoEdit.item) {
      const newtodo = {
        ...todoEdit.item,
        title,
        content,
      };
      updateMutate(newtodo);
      return;
    }
    addMutate({ title, content });
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
