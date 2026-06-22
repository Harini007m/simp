export interface Role {
  id: string;
  name: string;
  code: string;
  desc: string;
  status: 'Active' | 'Inactive';
  modulesCount: number;
  usersCount: number;
  color: string;
  bg: string;
  moduleIds: string[];
  permissions: string[];
}

export const MOCK_ROLES: Role[] = [
  { id: 'role-1', name: 'Student', code: 'ROLE_STUDENT', desc: 'Can access LMS and submit tasks.', status: 'Active', modulesCount: 5, usersCount: 245, color: 'text-emerald-600', bg: 'bg-emerald-100', moduleIds: ['lms', 'task', 'assessment', 'submission', 'attendance'], permissions: ['view_lms', 'submit_task'] },
  { id: 'role-2', name: 'Mentor', code: 'ROLE_MENTOR', desc: 'Can evaluate tasks and mentor students.', status: 'Active', modulesCount: 6, usersCount: 34, color: 'text-amber-600', bg: 'bg-amber-100', moduleIds: ['mentor', 'task', 'assessment', 'submission', 'attendance', 'performance'], permissions: ['evaluate_task'] },
  { id: 'role-3', name: 'HR', code: 'ROLE_HR', desc: 'Can manage employees and track performance.', status: 'Active', modulesCount: 4, usersCount: 12, color: 'text-rose-600', bg: 'bg-rose-100', moduleIds: ['employee', 'organization', 'attendance', 'performance'], permissions: ['manage_employee'] },
  { id: 'role-4', name: 'College Coordinator', code: 'ROLE_CC', desc: 'Can track student progress and view reports.', status: 'Active', modulesCount: 4, usersCount: 28, color: 'text-violet-600', bg: 'bg-violet-100', moduleIds: ['college_coordinator', 'student', 'attendance', 'performance'], permissions: ['view_reports'] },
  { id: 'role-5', name: 'Super Admin', code: 'ROLE_ADMIN', desc: 'Full system access.', status: 'Active', modulesCount: 20, usersCount: 3, color: 'text-blue-600', bg: 'bg-blue-100', moduleIds: ['identity', 'employee', 'organization', 'program', 'opportunity', 'application', 'student', 'batch', 'allocation', 'mentor', 'lms', 'task', 'assessment', 'submission', 'attendance', 'performance', 'college_coordinator', 'dashboard', 'common_file', 'super_admin'], permissions: ['all'] },
];
