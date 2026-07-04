export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  roleId: string;
  roleName: string;
  status: 'Active' | 'Inactive';
  date: string;
  avatar: string;
  moduleOverrides?: string[];
  collegeId?: string;
  batchId?: string;
  departmentId?: string;
  entityType?: 'employee' | 'student' | 'organization';
  entityId?: string;
  forcePasswordChange?: boolean;
}
