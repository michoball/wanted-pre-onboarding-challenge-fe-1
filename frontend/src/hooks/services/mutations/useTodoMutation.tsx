import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import TodoService from "../../../api/todoService";
import TodoContext from "../../../context/todoContext";

const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const { editTodo } = useContext(TodoContext);
  const useAddTodoMutate = () => {
    return useMutation({
      mutationFn: TodoService.createTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
      },
    });
  };

  const useUpdateTodoMutate = () => {
    return useMutation({
      mutationFn: TodoService.updateTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
        editTodo("");
      },
    });
  };

  const useDeleteTodoMutate = () => {
    return useMutation({
      mutationFn: TodoService.deleteTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
      },
    });
  };

  return { useAddTodoMutate, useUpdateTodoMutate, useDeleteTodoMutate };
};

export default useTodoMutation;
