import { Module, MOCK_MODULES } from '../data/mock-modules';

export const moduleService = {
  async getModules(): Promise<Module[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_MODULES;
  },

  async getModule(id: string): Promise<Module | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_MODULES.find(m => m.id === id);
  }
};
