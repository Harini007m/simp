export interface AssessmentResult {
  id: string;
  title: string;
  date: string;
  score: number;
  status: 'Passed' | 'Failed' | 'Pending';
}

export interface Assessment {
  id: string;
  title: string;
  courseId: string;
  batchId: string;
  totalMarks: number;
  passingMarks: number;
  date: string;
}

export const MOCK_ASSESSMENT_RESULTS: AssessmentResult[] = [
  { id: 'asm-res-1', title: 'React Hooks Fundamentals', date: '2023-11-05', score: 92, status: 'Passed' },
  { id: 'asm-res-2', title: 'State Management Patterns', date: '2023-11-12', score: 85, status: 'Passed' },
  { id: 'asm-res-3', title: 'Next.js Routing Matrix', date: '2023-11-19', score: 68, status: 'Failed' },
];

export const MOCK_ASSESSMENTS: Assessment[] = [
  { id: 'asm-1', title: 'React Architecture Prep', courseId: 'course-1', batchId: 'batch-1', totalMarks: 100, passingMarks: 75, date: '2023-12-01' }
];
