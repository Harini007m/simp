import { Module } from '../types/api/module.types';
import { moduleApi } from '../api/module.api';

export const moduleService = {
  async getModules(): Promise<Module[]> {
        const data = await moduleApi.getModules();
        return data;
    },

  async getModule(id: string): Promise<Module | undefined> {
      const data = await moduleApi.getModule(id);
      return data;
  },

  async createModule(mod: Omit<Module, 'active'> & { active?: boolean }): Promise<Module> {
      const result = await moduleApi.createModule(mod);
      return result;
  },

  async updateModule(id: string, updates: Partial<Module>): Promise<Module | undefined> {
      const result = await moduleApi.updateModule(id, updates);
      return result;
  }
};
