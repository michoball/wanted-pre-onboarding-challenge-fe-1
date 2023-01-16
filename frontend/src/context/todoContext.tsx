import { createContext, useState, useEffect, useCallback } from "react";
import TodoService from "../api/todoService";

export interface Todo {
  title: string;
  content: string;
}

export interface ITodoData extends Todo {
  id: string;
  updatedAt: string;
  createdAt: string;
}

interface TodoContextType {
  todos: ITodoData[];
  todoEdit: string;
  setUserToken: (token: string) => void;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (todoId: string) => void;
  editTodo: (todoId: string) => void;
  updateTodo: (item: ITodoData) => void;
  isLoading: boolean;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  deleteTodo: (todoId: string) => {},
  addTodo: (newTodo: Todo) => {},
  editTodo: (id: string) => {},
  updateTodo: (item: ITodoData) => {},
  todoEdit: "",
  setUserToken: (token: string) => {},
  isLoading: true,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ITodoData[]>([]);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [todoEdit, setTodoEdit] = useState("");

  const fetchTodoListsHandler = useCallback(async () => {
    const { data } = await TodoService.getAllTodo();
    setTodos(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userToken) fetchTodoListsHandler();
  }, [fetchTodoListsHandler, userToken]);

  const deleteTodoHandler = async (todoId: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await TodoService.deleteTodo(todoId);
      setTodos(todos.filter((item) => item.id !== todoId));

      // if (todoEdit.edit)
      //   setTodoEdit({
      //     item: null,
      //     edit: false,
      //   });
    }
  };

  const addTodoHandler = async (newTodo: Todo) => {
    const data = await TodoService.createTodo(newTodo);
    setTodos([data.data, ...todos]);
  };

  const updateTodoHandler = async (upTodo: ITodoData) => {
    const { data } = await TodoService.updateTodo(upTodo);
    setTodos(
      todos.map((item) => (item.id === upTodo.id ? { ...item, ...data } : item))
    );
  };

  const editTodoHandler = (id: string) => {
    setTodoEdit(id);
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
