import { apiClient } from './api.client';
import { ProductivityWorkspace, PersonalTask, StickyNote, Bookmark } from '../types/productivity.types';

export const ProductivityAPI = {
  getWorkspace: async (): Promise<ProductivityWorkspace> => {
    try {
      const res = await apiClient.get('/api/v1/productivity');
      const data = res.data?.data;
      return {
        tasks: data?.tasks || [],
        notes: data?.notes || [],
        bookmarks: data?.bookmarks || []
      };
    } catch (error) {
      return { tasks: [], notes: [], bookmarks: [] };
    }
  },

  // Tasks
  createTask: async (task: { title: string; dueDate: string }): Promise<PersonalTask> => {
    const res = await apiClient.post('/api/v1/productivity/tasks', task);
    return res.data.data;
  },

  updateTask: async (id: string, updates: { completed?: boolean; title?: string }): Promise<PersonalTask> => {
    const res = await apiClient.patch(`/api/v1/productivity/tasks/${id}`, updates);
    return res.data.data;
  },

  deleteTask: async (id: string): Promise<any> => {
    const res = await apiClient.delete(`/api/v1/productivity/tasks/${id}`);
    return res.data.data;
  },

  // Sticky Notes
  createNote: async (note: { content: string; color: string }): Promise<StickyNote> => {
    const res = await apiClient.post('/api/v1/productivity/notes', note);
    return res.data.data;
  },

  updateNote: async (id: string, updates: { content?: string; color?: string }): Promise<StickyNote> => {
    const res = await apiClient.patch(`/api/v1/productivity/notes/${id}`, updates);
    return res.data.data;
  },

  deleteNote: async (id: string): Promise<any> => {
    const res = await apiClient.delete(`/api/v1/productivity/notes/${id}`);
    return res.data.data;
  },

  // Bookmarks
  createBookmark: async (bookmark: { title: string; url: string; category: string }): Promise<Bookmark> => {
    const res = await apiClient.post('/api/v1/productivity/bookmarks', bookmark);
    return res.data.data;
  },

  deleteBookmark: async (id: string): Promise<any> => {
    const res = await apiClient.delete(`/api/v1/productivity/bookmarks/${id}`);
    return res.data.data;
  }
};
