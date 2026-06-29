import { SystemSetting, AuditLog, RolePermission } from '../types/api/super-admin.types';
import { superAdminApi } from "../api/super-admin.api";

class SuperAdminService {
  async getSystemSettings(): Promise<SystemSetting[]> {
      return superAdminApi.getSystemSettings();
  }

  async getAuditLogs(): Promise<AuditLog[]> {
      return superAdminApi.getAuditLogs();
  }

  async getRolePermissions(): Promise<RolePermission[]> {
      return superAdminApi.getRolePermissions();
  }
}

export const superAdminService = new SuperAdminService();
