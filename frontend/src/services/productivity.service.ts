import { ProductivityAPI } from '../api/productivity.api';
import { ProductivityWorkspace, PersonalTask, StickyNote, Bookmark } from '../types/productivity.types';

export class ProductivityService {
  static async getWorkspace(): Promise<ProductivityWorkspace> {
    return await ProductivityAPI.getWorkspace();
  }

  // Tasks
  static async createTask(title: string, dueDate: string): Promise<PersonalTask> {
    return await ProductivityAPI.createTask({ title, dueDate });
  }

  static async toggleTask(id: string, completed: boolean): Promise<PersonalTask> {
    return await ProductivityAPI.updateTask(id, { completed });
  }

  static async deleteTask(id: string): Promise<any> {
    return await ProductivityAPI.deleteTask(id);
  }

  // Sticky Notes
  static async createNote(content: string, color: string): Promise<StickyNote> {
    return await ProductivityAPI.createNote({ content, color });
  }

  static async updateNote(id: string, content: string, color: string): Promise<StickyNote> {
    return await ProductivityAPI.updateNote(id, { content, color });
  }

  static async deleteNote(id: string): Promise<any> {
    return await ProductivityAPI.deleteNote(id);
  }

  // Bookmarks
  static async createBookmark(title: string, url: string, category: string): Promise<Bookmark> {
    return await ProductivityAPI.createBookmark({ title, url, category });
  }

  static async deleteBookmark(id: string): Promise<any> {
    return await ProductivityAPI.deleteBookmark(id);
  }
}
