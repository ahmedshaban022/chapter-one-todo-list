/**
 * Todo Repository Interface
 * Following the Dependency Inversion Principle (DIP) from SOLID
 * High-level modules should depend on abstractions, not concrete implementations
 */

import { Todo, CreateTodoInput, UpdateTodoInput } from '../../types/Todo';

export interface ITodoRepository {
  /**
   * Get all todos
   */
  getAll(): Promise<Todo[]>;

  /**
   * Get a todo by ID
   */
  getById(id: string): Promise<Todo | null>;

  /**
   * Create a new todo
   */
  create(input: CreateTodoInput): Promise<Todo>;

  /**
   * Update an existing todo
   */
  update(id: string, input: UpdateTodoInput): Promise<Todo | null>;

  /**
   * Delete a todo
   */
  delete(id: string): Promise<boolean>;

  /**
   * Delete all todos
   */
  deleteAll(): Promise<void>;
}

