import React, { useState } from "react";
import { useTodos } from "../hooks/use-todos";
import { useAppDispatch } from "../hooks/redux";
import { setFilter } from "../store/slices/todo-slice";
import type { Todo } from "../store/slices/todo-slice";

export const TodoList: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const { todos, isLoading, error, createTodo, toggleTodo, deleteTodo } =
    useTodos();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      createTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* Filter buttons */}
      <div className="mb-4">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("active"))}
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Active
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Completed
        </button>
      </div>

      {/* Add todo form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add new todo"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Todo
        </button>
      </form>

      {/* Todo list */}
      <ul className="space-y-2">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 border rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, !todo.completed)}
                className="mr-2"
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
