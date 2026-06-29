export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  status: 'Active' | 'Inactive';
  username: string;
  moduleOverrides: string[];
  avatar: string;
  date: string;
  departmentId?: string;
  collegeId?: string;
  batchId?: string;
  organizationId?: string;
}
