import { createContext, useState, useEffect, useCallback } from "react";
import TodoService from "../service/todoService";

export interface Todo {
  title: string;
  content: string;
}

export interface ITodoData extends Todo {
  id: string;
  updatedAt: string;
}

interface TodoContextType {
  todos: ITodoData[];
  todoEdit: { item: ITodoData | null; edit: boolean };
  setUserToken: (token: string) => void;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (todoId: string) => void;
  editTodo: (item: ITodoData) => void;
  updateTodo: (item: ITodoData) => void;
  isLoading: boolean;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  deleteTodo: (todoId: string) => {},
  addTodo: (newTodo: Todo) => {},
  editTodo: (item: ITodoData) => {},
  updateTodo: (item: ITodoData) => {},
  todoEdit: { item: null, edit: false },
  setUserToken: (token: string) => {},
  isLoading: true,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ITodoData[]>([]);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [todoEdit, setTodoEdit] = useState<{
    item: ITodoData | null;
    edit: boolean;
  }>({
    item: null,
    edit: false,
  });

  const fetchTodoListsHandler = useCallback(async (userToken: string) => {
    const res = await TodoService.getAllTodoService(userToken);
    setTodos(res.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchTodoListsHandler(userToken);
    }
  }, [userToken, fetchTodoListsHandler]);

  const deleteTodoHandler = async (todoId: string) => {
    if (!userToken) return alert("user is not logged in");

    if (window.confirm("Are you sure you want to delete?")) {
      await TodoService.deleteTodoService(todoId, userToken);
      setTodos(todos.filter((item) => item.id !== todoId));

      if (todoEdit.edit)
        setTodoEdit({
          item: null,
          edit: false,
        });
    }
  };

  const addTodoHandler = async (newTodo: Todo) => {
    if (!userToken) return alert("user is not logged in");

    const { data } = await TodoService.createTodoService(newTodo, userToken);
    setTodos([data, ...todos]);
  };

  const updateTodoHandler = async (upTodo: ITodoData) => {
    if (!userToken) return alert("user is not logged in");

    const { data } = await TodoService.updateTodoService(userToken, upTodo);
    setTodos(
      todos.map((item) => (item.id === upTodo.id ? { ...item, ...data } : item))
    );
  };

  const editTodoHandler = (item: ITodoData) => {
    setTodoEdit({
      item,
      edit: true,
    });
  };

  const value = {
    todos,
    isLoading,
    setUserToken,
    deleteTodo: deleteTodoHandler,
    addTodo: addTodoHandler,
    editTodo: editTodoHandler,
    updateTodo: updateTodoHandler,
    todoEdit,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContext;
