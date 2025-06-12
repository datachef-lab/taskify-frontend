import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "./redux";
import { todoService } from "../services/todoService";
import { setTodos, addTodo, toggleTodo } from "../store/slices/todoSlice";
import type { Todo } from "../store/slices/todoSlice";

export const useTodos = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const filter = useAppSelector((state) => state.todos.filter);
  const todos = useAppSelector((state) => state.todos.todos);

  // Fetch todos
  const { isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = await todoService.getTodos();
      dispatch(setTodos(data));
      return data;
    },
  });

  // Create todo mutation
  const createTodoMutation = useMutation({
    mutationFn: (title: string) => todoService.createTodo(title),
    onSuccess: (newTodo) => {
      dispatch(addTodo(newTodo));
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Toggle todo mutation
  const toggleTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todoService.updateTodo(id, { completed }),
    onSuccess: (_, { id }) => {
      dispatch(toggleTodo(id));
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Filtered todos
  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    isLoading,
    error,
    createTodo: createTodoMutation.mutate,
    toggleTodo: (id: number, completed: boolean) =>
      toggleTodoMutation.mutate({ id, completed }),
    deleteTodo: deleteTodoMutation.mutate,
  };
};
