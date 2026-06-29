export interface SystemSetting { id: string; [key: string]: any; }
export interface AuditLog { id: string; action: string; [key: string]: any; }
export interface RolePermission { id: string; roleId: string; [key: string]: any; }