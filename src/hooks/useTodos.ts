/**
 * Custom Hook for Todo Management
 * Encapsulates todo state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput, TodoStatus } from '../types/Todo';
import { ITodoRepository } from '../services/interfaces/ITodoRepository';

export const useTodos = (todoRepository: ITodoRepository) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from storage
  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedTodos = await todoRepository.getAll();
      setTodos(loadedTodos);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [todoRepository]);

  // Create a new todo
  const createTodo = useCallback(async (input: CreateTodoInput) => {
    try {
      setError(null);
      const newTodo = await todoRepository.create(input);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
      throw err;
    }
  }, [todoRepository]);

  // Update an existing todo
  const updateTodo = useCallback(async (id: string, input: UpdateTodoInput) => {
    try {
      setError(null);
      const updatedTodo = await todoRepository.update(id, input);
      if (updatedTodo) {
        setTodos(prev =>
          prev.map(todo => (todo.id === id ? updatedTodo : todo))
        );
      }
      return updatedTodo;
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
      throw err;
    }
  }, [todoRepository]);

  // Delete a todo
  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      const success = await todoRepository.delete(id);
      if (success) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
      throw err;
    }
  }, [todoRepository]);

  // Toggle todo status
  const toggleTodoStatus = useCallback(async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;

    const newStatus =
      todo.status === TodoStatus.ACTIVE
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

    return updateTodo(id, { status: newStatus });
  }, [todos, updateTodo]);

  // Delete all todos
  const deleteAllTodos = useCallback(async () => {
    try {
      setError(null);
      await todoRepository.deleteAll();
      setTodos([]);
    } catch (err) {
      setError('Failed to delete all todos');
      console.error(err);
      throw err;
    }
  }, [todoRepository]);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Computed values
  const activeTodos = todos.filter(todo => todo.status === TodoStatus.ACTIVE);
  const completedTodos = todos.filter(todo => todo.status === TodoStatus.COMPLETED);

  return {
    todos,
    activeTodos,
    completedTodos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    deleteAllTodos,
    refreshTodos: loadTodos,
  };
};

