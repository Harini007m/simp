import { User, MOCK_USERS } from '../data/mock-users';
import { roleService } from './role.service';
import { moduleService } from './module.service';
import { Module } from '../data/mock-modules';

export const userService = {
  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_USERS;
  },

  async getUser(id: string): Promise<User | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_USERS.find(u => u.id === id);
  },

  async getUserModules(id: string): Promise<Module[]> {
    const user = await this.getUser(id);
    if (!user) return [];

    const role = await roleService.getRole(user.roleId);
    let allowedModuleIds = new Set<string>();

    if (role && role.moduleIds) {
      role.moduleIds.forEach(m => allowedModuleIds.add(m));
    }

    if (user.moduleOverrides) {
      user.moduleOverrides.forEach(m => allowedModuleIds.add(m));
    }

    const allModules = await moduleService.getModules();
    return allModules.filter(m => allowedModuleIds.has(m.id) && m.active);
  }
};
