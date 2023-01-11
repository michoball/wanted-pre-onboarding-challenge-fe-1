import { ITodoData, Todo } from "../context/todoContext";

const getAllTodoService = async (token: string) => {
  const response = await fetch(`/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    response.json().then((data) => {
      let errorMessage = "get All Todo failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
  return response.json();
};

const getOneTodoService = async (id: string, token: string) => {
  const response = await fetch(`/todos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    response.json().then((data) => {
      let errorMessage = "get todo failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
  return response.json();
};

const createTodoService = async (todo: Todo, token: string) => {
  const { title, content } = todo;
  const response = await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `${token}` },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    response.json().then((data) => {
      let errorMessage = "create todo failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
  return response.json();
};

const updateTodoService = async (token: string, todo: ITodoData) => {
  const { title, content, id } = todo;
  const response = await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    response.json().then((data) => {
      let errorMessage = "update todo failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
  return response.json();
};

const deleteTodoService = async (id: string, token: string) => {
  const response = await fetch(`/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  if (!response.ok) {
    response.json().then((data) => {
      let errorMessage = "delete todo failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
  return response.json();
};

const TodoService = {
  getAllTodoService,
  createTodoService,
  getOneTodoService,
  updateTodoService,
  deleteTodoService,
};

export default TodoService;
