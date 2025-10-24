/**
 * Storage Service Interface
 * Following the Interface Segregation Principle (ISP) from SOLID
 */

export interface IStorageService<T> {
  /**
   * Save an item to storage
   */
  save(key: string, value: T): Promise<void>;

  /**
   * Retrieve an item from storage
   */
  get(key: string): Promise<T | null>;

  /**
   * Remove an item from storage
   */
  remove(key: string): Promise<void>;

  /**
   * Clear all items from storage
   */
  clear(): Promise<void>;
}

