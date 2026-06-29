
import { roleApi } from '../api/role.api';
import { Role } from '../types/api/role.types';

export const roleService = {
  async getRoles(): Promise<Role[]> {
        const data = await roleApi.getRoles();
        return data;
    },

  async getRole(id: string): Promise<Role | undefined> {
      const data = await roleApi.getRoleById(id);
      return data;
  },

  async createRole(role: Omit<Role, 'id' | 'modulesCount' | 'usersCount' | 'color' | 'bg'> & { color?: string, bg?: string }): Promise<Role> {
      const data = await roleApi.createRole(role as any);
      return data;
  },

  async updateRole(id: string, updatedData: Partial<Role>): Promise<Role | undefined> {
      const data = await roleApi.updateRole(id, updatedData);
      return data;
  },

  async deleteRole(id: string): Promise<boolean> {
      const success = await roleApi.deleteRole(id);
      return success;
  }
};
