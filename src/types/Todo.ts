/**
 * Todo Type Definitions
 * Defines the core data structures for the todo application
 */

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: number;
  completedAt?: number;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'completedAt'>;

export type UpdateTodoInput = Partial<Omit<Todo, 'id' | 'createdAt'>>;

