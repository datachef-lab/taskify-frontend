import axiosInstance from "../config/axios";
import { Todo } from "../store/slices/todo-slice";

export const todoService = {
    // Get all todos
    getTodos: async (): Promise<Todo[]> => {
        const response = await axiosInstance.get("/todos");
        return response.data;
    },

    // Create a new todo
    createTodo: async (title: string): Promise<Todo> => {
        const response = await axiosInstance.post("/todos", { title });
        return response.data;
    },

    // Update a todo
    updateTodo: async (id: number, updates: Partial<Todo>): Promise<Todo> => {
        const response = await axiosInstance.patch(`/todos/${id}`, updates);
        return response.data;
    },

    // Delete a todo
    deleteTodo: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/todos/${id}`);
    },
};
