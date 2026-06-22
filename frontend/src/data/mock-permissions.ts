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
