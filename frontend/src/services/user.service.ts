import { User } from '../types/api/user.types';
import { roleService } from './role.service';
import { moduleService } from './module.service';
import { Module } from '../types/api/module.types';
import { userApi } from "../api/user.api";

export const userService = {
  async getUsers(): Promise<User[]> {
        return userApi.getUsers();
    },

  async getUser(id: string): Promise<User | undefined> {
      return userApi.getUser(id);
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
      return userApi.getUserByEmail(email);
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

    // Super Admin gets all modules
    if (role && role.permissions.includes('all')) {
      return allModules.filter(m => m.active);
    }

    return allModules.filter(m => allowedModuleIds.has(m.id) && m.active);
  },

  async getUserPermissions(id: string): Promise<string[]> {
    const user = await this.getUser(id);
    if (!user) return [];

    const role = await roleService.getRole(user.roleId);
    if (!role) return [];

    return role.permissions;
  },

  async createUser(user: Omit<User, 'id' | 'date' | 'avatar'> & { avatar?: string }): Promise<User> {
      return userApi.createUser(user);
  },

  async updateUser(id: string, updatedData: Partial<User>): Promise<User | undefined> {
      return userApi.updateUser(id, updatedData);
  },

  async deleteUser(id: string): Promise<boolean> {
      return userApi.deleteUser(id);
  }
};
