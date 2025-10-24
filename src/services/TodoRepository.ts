/**
 * Todo Repository Implementation
 * Following SOLID principles:
 * - SRP: Only responsible for todo CRUD operations
 * - OCP: Open for extension, closed for modification
 * - DIP: Depends on IStorageService abstraction, not concrete implementation
 */

import { Todo, CreateTodoInput, UpdateTodoInput, TodoStatus } from '../types/Todo';
import { ITodoRepository } from './interfaces/ITodoRepository';
import { IStorageService } from './interfaces/IStorageService';

const STORAGE_KEY = '@todos';

export class TodoRepository implements ITodoRepository {
  constructor(private storageService: IStorageService<Todo[]>) {}

  async getAll(): Promise<Todo[]> {
    const todos = await this.storageService.get(STORAGE_KEY);
    return todos || [];
  }

  async getById(id: string): Promise<Todo | null> {
    const todos = await this.getAll();
    return todos.find(todo => todo.id === id) || null;
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const todos = await this.getAll();
    
    const newTodo: Todo = {
      ...input,
      id: this.generateId(),
      createdAt: Date.now(),
    };

    todos.push(newTodo);
    await this.storageService.save(STORAGE_KEY, todos);
    
    return newTodo;
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo | null> {
    const todos = await this.getAll();
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) {
      return null;
    }

    const updatedTodo: Todo = {
      ...todos[index],
      ...input,
    };

    // Set completedAt when marking as completed
    if (input.status === TodoStatus.COMPLETED && todos[index].status !== TodoStatus.COMPLETED) {
      updatedTodo.completedAt = Date.now();
    }

    // Clear completedAt when marking as active
    if (input.status === TodoStatus.ACTIVE) {
      updatedTodo.completedAt = undefined;
    }

    todos[index] = updatedTodo;
    await this.storageService.save(STORAGE_KEY, todos);
    
    return updatedTodo;
  }

  async delete(id: string): Promise<boolean> {
    const todos = await this.getAll();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) {
      return false; // Todo not found
    }

    await this.storageService.save(STORAGE_KEY, filteredTodos);
    return true;
  }

  async deleteAll(): Promise<void> {
    await this.storageService.save(STORAGE_KEY, []);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

