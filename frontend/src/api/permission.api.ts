import { apiClient } from './api.client';
import { Permission } from "../types/api/permission.types";

export const permissionApi = {
    async getPermissionsForModule(moduleId: string): Promise<string[]> {
        const response = await apiClient.get('/permission');
        return response.data;
    },
    async getPermissions(): Promise<Permission[]> {
        const response = await apiClient.get('/permission');
        return response.data;
    }
};
