import { MOCK_PERMISSIONS } from '../data/mock-permissions';

export const permissionService = {
  async getPermissionsForModule(moduleId: string): Promise<string[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_PERMISSIONS[moduleId] || ['View', 'Create', 'Edit', 'Delete'];
  }
};
