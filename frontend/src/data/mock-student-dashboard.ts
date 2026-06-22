export interface StudentDashboardData {
  fees: {
    total: number;
    balance: number;
  };
  kpiStats: {
    technical: number;
    delivery: number;
    communication: number;
  };
  announcements: Array<{
    date: string;
    title: string;
    content: string;
  }>;
  capstoneStatus: string;
  courses: Array<{
    title: string;
    progress: number;
  }>;
  agenda: Array<{
    id: string;
    task: string;
    time: string;
    completed: boolean;
  }>;
}

export const MOCK_STUDENT_DASHBOARD: StudentDashboardData = {
  fees: { total: 0, balance: 0 },
  kpiStats: { technical: 88, delivery: 92, communication: 85 },
  announcements: [
    { date: 'Today', title: 'Phase 5 Architecture Rolled Out', content: 'The new composable architecture is fully active.' },
    { date: 'Yesterday', title: 'Upcoming Code Reviews', content: 'Ensure your repositories are linked.' }
  ],
  capstoneStatus: 'Under Review',
  courses: [
    { title: 'React Performance Patterns', progress: 85 },
    { title: 'Node.js Microservices', progress: 40 }
  ],
  agenda: [
    { id: 'ag-1', task: 'Review PR #42', time: '10:00 AM', completed: true },
    { id: 'ag-2', task: 'Sync with Mentor', time: '02:00 PM', completed: false }
  ]
};
