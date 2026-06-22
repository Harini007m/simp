import { Role, MOCK_ROLES } from '../data/mock-roles';

export const roleService = {
  async getRoles(): Promise<Role[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ROLES;
  },

  async getRole(id: string): Promise<Role | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_ROLES.find(r => r.id === id);
  }
};
