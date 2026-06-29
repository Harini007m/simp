import { Permission } from '../types/api/permission.types';
import { permissionApi } from "../api/permission.api";

export const permissionService = {
  async getPermissionsForModule(moduleId: string): Promise<string[]> {
        return permissionApi.getPermissionsForModule(moduleId);
    },

  async getPermissions(): Promise<Permission[]> {
      return permissionApi.getPermissions();
  }
};
