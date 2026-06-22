import { Task, MOCK_TASKS } from '../data/mock-tasks';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_TASKS;
  },

  async getTask(id: string): Promise<Task | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_TASKS.find(task => task.id === id);
  },

  async getTasksByBatch(batchId: string): Promise<Task[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_TASKS.filter(task => task.batchId === batchId);
  }
};
