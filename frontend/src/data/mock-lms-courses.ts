export interface Lecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  notes: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  image: string;
  progress: number;
  assignedBatchIds: string[];
  lectures: Lecture[];
}

export const MOCK_LMS_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced React Patterns & Performance',
    category: 'Frontend UI',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    progress: 100,
    assignedBatchIds: ['batch-1'],
    lectures: [
      {
        id: 'lec-1',
        title: 'Component Lifecycle and Hooks Deep Dive',
        duration: '45 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        notes: 'Review how useEffect dependencies map to render cycles. Avoid stale closures.',
        completed: true
      },
      {
        id: 'lec-2',
        title: 'Memoization Strategies (useMemo, useCallback)',
        duration: '52 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        notes: 'Only memoize expensive calculations. Over-memoization causes memory bloat.',
        completed: true
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Node.js Microservices Architecture',
    category: 'Backend Dev',
    image: 'https://images.unsplash.com/photo-1627398246734-d8db53e34376?w=800&auto=format&fit=crop&q=60',
    progress: 35,
    assignedBatchIds: ['batch-2', 'batch-3'],
    lectures: [
      {
        id: 'lec-3',
        title: 'Event-Driven Communication',
        duration: '60 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        notes: 'RabbitMQ vs Kafka. Choose based on persistence needs vs throughput.',
        completed: true
      },
      {
        id: 'lec-4',
        title: 'API Gateway Implementation',
        duration: '48 mins',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        notes: 'Kong vs NGINX vs Custom Node Gateway.',
        completed: false
      }
    ]
  }
];
