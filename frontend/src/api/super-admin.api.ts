import { apiClient } from './api.client';
import { SystemSetting } from "../types/api/super-admin.types";
import { AuditLog } from "../types/api/super-admin.types";
import { RolePermission } from "../types/api/super-admin.types";

export const superAdminApi = {
    async getSystemSettings(): Promise<SystemSetting[]> {
        const response = await apiClient.get('/super/admin');
        return response.data;
    },
    async getAuditLogs(): Promise<AuditLog[]> {
        const response = await apiClient.get('/super/admin');
        return response.data;
    },
    async getRolePermissions(): Promise<RolePermission[]> {
        const response = await apiClient.get('/super/admin');
        return response.data;
    }
};
