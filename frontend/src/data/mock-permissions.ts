export interface Permission {
  id: string;
  name: string;
  module: string;
  description: string;
}

export const MOCK_PERMISSIONS: Record<string, string[]> = {
  lms: ['View', 'Create', 'Edit', 'Delete'],
  assessment: ['View', 'Submit', 'Evaluate', 'Publish'],
  attendance: ['View', 'Mark Attendance', 'Edit Attendance', 'Approve Dispute'],
  task: ['View', 'Assign', 'Edit', 'Delete'],
  submission: ['View', 'Grade', 'Reject'],
  performance: ['View Reports', 'Export Data'],
  certificate: ['View', 'Generate', 'Revoke'],
  dashboard: ['View System KPIs', 'View Activity'],
  identity: ['Manage Users', 'Manage Roles'],
};

export const MOCK_PERMISSION_LIST: Permission[] = [
  { id: 'view_lms', name: 'View LMS', module: 'lms', description: 'Can view LMS contents' },
  { id: 'submit_task', name: 'Submit Task', module: 'task', description: 'Can submit tasks' },
  { id: 'evaluate_task', name: 'Evaluate Task', module: 'task', description: 'Can evaluate tasks' },
  { id: 'manage_employee', name: 'Manage Employee', module: 'employee', description: 'Can manage employees' },
  { id: 'view_reports', name: 'View Reports', module: 'performance', description: 'Can view performance reports' },
  { id: 'all', name: 'All Permissions', module: 'super_admin', description: 'Full system access' }
];
