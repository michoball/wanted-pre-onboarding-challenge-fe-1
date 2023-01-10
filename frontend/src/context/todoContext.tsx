import { createContext, useState, useEffect, useCallback } from "react";
import TodoService from "../service/todoService";

export interface Todo {
  title: string;
  content: string;
}

export interface ITodos extends Todo {
  id: string;
  updatedAt: string;
}

interface TodoContextType {
  todos: ITodos[];
  todoEdit: { item: ITodos | null; edit: boolean };
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (todoId: string) => void;
  editTodo: (item: ITodos) => void;
  updateTodo: (item: ITodos) => void;
  isLoading: boolean;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  deleteTodo: (todoId: string) => {},
  addTodo: (newTodo: Todo) => {},
  editTodo: (item: ITodos) => {},
  updateTodo: (item: ITodos) => {},
  todoEdit: { item: null, edit: false },
  isLoading: true,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ITodos[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todoEdit, setTodoEdit] = useState<{
    item: ITodos | null;
    edit: boolean;
  }>({
    item: null,
    edit: false,
  });
  const userToken = localStorage.getItem("token");

  const fetchTodoLists = useCallback(async () => {
    if (!userToken) return alert("user is no logged in");
    const res = await TodoService.getAllTodoService(userToken);
    setTodos(res.data);
    setIsLoading(false);
  }, [userToken]);

  useEffect(() => {
    fetchTodoLists();
  }, [fetchTodoLists]);

  const deleteTodo = async (todoId: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      if (!userToken) return alert("user is no logged in");
      try {
        await TodoService.deleteTodoService(todoId, userToken);
        setTodos(todos.filter((item) => item.id !== todoId));
      } catch (error) {
        alert(error);
      }
    }
  };

  const addTodoHandler = async (newTodo: Todo) => {
    if (!userToken) return alert("user is no logged in");
    try {
      const res = await TodoService.createTodoService(newTodo, userToken);
      setTodos([res.data, ...todos]);
    } catch (error) {
      alert(error);
    }
  };

  const updateTodo = async (upTodo: ITodos) => {
    if (!userToken) return alert("user is no logged in");
    try {
      const res = await TodoService.updateTodoService(userToken, upTodo);
      console.log(res);
      setTodos(
        todos.map((item) =>
          item.id === upTodo.id ? { ...item, ...res.data } : item
        )
      );
    } catch (error) {
      alert(error);
    }
  };

  const editTodo = (item: ITodos) => {
    setTodoEdit({
      item,
      edit: true,
    });
  };

  const value = {
    todos,
    isLoading,
    deleteTodo,
    addTodo: addTodoHandler,
    editTodo,
    updateTodo,
    todoEdit,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContext;
