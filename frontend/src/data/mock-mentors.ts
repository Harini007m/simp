export interface Mentor {
  id: string;
  employeeId: string;
  batchIds: string[];
  expertise: string[];
  status: 'Active' | 'Inactive';
}

export const MOCK_MENTORS: Mentor[] = [
  { id: 'men-1', employeeId: 'emp-2', batchIds: ['batch-1', 'batch-2'], expertise: ['React', 'Node.js', 'System Design'], status: 'Active' },
  { id: 'men-2', employeeId: 'emp-1', batchIds: ['batch-3'], expertise: ['Leadership', 'Agile', 'HR'], status: 'Active' },
];
