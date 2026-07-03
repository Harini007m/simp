import { apiClient } from '../api/api.client';
import { Role, RoleCreate, RoleUpdate } from '../types/api/role.types';
import { roleApi } from '../api/role.api';

export const roleService = {
  async getRoles(): Promise<Role[]> {
    try {
      return await roleApi.getRoles();
    } catch (error) {
      return [];
    }
  },

  async getRole(id: string): Promise<Role | undefined> {
    try {
      return await roleApi.getRoleById(id);
    } catch (error) {
      return undefined;
    }
  },

  async createRole(role: Omit<Role, 'id' | 'modulesCount' | 'usersCount' | 'color' | 'bg'> & { color?: string, bg?: string }): Promise<Role> {
    try {
      const payload: any = {
        name: role.name,
        code: role.code,
        description: role.desc,
        is_system: false,
        is_active: role.isActive !== undefined ? role.isActive : true,
        icon: role.icon,
        module_ids: role.moduleIds
      };
      return await roleApi.createRole(payload);
    } catch (error) {
      console.error("Error creating role in service:", error);
      throw error;
    }
  },

  async updateRole(id: string, updatedData: Partial<Role>): Promise<Role | undefined> {
    try {
      const payload: any = {};
      if (updatedData.name !== undefined) payload.name = updatedData.name;
      if (updatedData.desc !== undefined) payload.description = updatedData.desc;
      if (updatedData.moduleIds !== undefined) payload.module_ids = updatedData.moduleIds;
      if (updatedData.isActive !== undefined) payload.is_active = updatedData.isActive;
      if (updatedData.icon !== undefined) payload.icon = updatedData.icon;
      
      return await roleApi.updateRole(id, payload);
    } catch (error) {
      console.error("Error updating role in service:", error);
      throw error;
    }
  },

  async deleteRole(id: string): Promise<boolean> {
    try {
      return await roleApi.deleteRole(id);
    } catch (error) {
      return false;
    }
  }
};
