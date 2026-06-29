import { Task, TaskAssignee } from '../types/api/task.types';

import { taskApi } from '../api/task.api';

export const taskService = {
  async getTasks(): Promise<Task[]> {
        const data = await taskApi.getTasks();
        return data;
    },

  async getTask(id: string): Promise<Task | undefined> {
      const data = await taskApi.getTask(id);
      return data;
  },

  async getTasksByBatch(batchId: string): Promise<Task[]> {
      const data = await taskApi.getTasksByBatch(batchId);
      return data;
  },

  async getAssignees(taskId: string): Promise<TaskAssignee[]> {
      const data = await taskApi.getAssignees(taskId);
      return data;
  }
};
