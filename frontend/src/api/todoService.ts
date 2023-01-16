import { ITodoData, Todo } from "../context/todoContext";
import { api } from "../utill/apiConfig";

const getAllTodo = async () => {
  const response = await api.get<{ data: ITodoData[] }>("/todos");
  return response.data;
};

const getOneTodo = async (id: string) => {
  const response = await api.get<{ data: ITodoData }>(`/todos/${id}`);
  return response.data;
};

const createTodo = async (todo: Todo) => {
  const response = await api.post<{ data: ITodoData }>("/todos", todo);
  return response.data;
};

const updateTodo = async (todo: ITodoData) => {
  const { title, content, id } = todo;
  const response = await api.put<{ data: ITodoData }>(`/todos/${id}`, {
    title,
    content,
  });
  return response.data;
};

const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

const TodoService = {
  getAllTodo,
  createTodo,
  getOneTodo,
  updateTodo,
  deleteTodo,
};

export default TodoService;
