import { Program, MOCK_PROGRAMS } from '../data/mock-programs';

export const programService = {
  async getPrograms(): Promise<Program[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_PROGRAMS];
  },

  async getProgram(id: string): Promise<Program | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_PROGRAMS.find(prog => prog.id === id);
  },

  async updateProgram(id: string, updates: Partial<Program>): Promise<Program | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const idx = MOCK_PROGRAMS.findIndex(p => p.id === id);
    if (idx !== -1) {
      MOCK_PROGRAMS[idx] = {
        ...MOCK_PROGRAMS[idx],
        ...updates
      };
      return MOCK_PROGRAMS[idx];
    }
    return undefined;
  },

  async bulkUpdateStatus(ids: string[], status: Program['status']): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    MOCK_PROGRAMS.forEach(prog => {
      if (ids.includes(prog.id)) {
        const oldStatus = prog.status;
        prog.status = status;
        prog.timeline.unshift({
          date: new Date().toISOString().split('T')[0],
          title: 'Bulk Status Transition',
          description: `Program status bulk-transitioned from ${oldStatus} to ${status}.`,
          type: 'update'
        });
      }
    });
    return true;
  },

  async bulkAssignMentor(ids: string[], mentorId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    // For simplicity, we can fetch name from employee list mock or hardcode
    const mentorName = mentorId === 'emp-2' ? 'Bob Johnson' : mentorId === 'emp-3' ? 'Diana Prince' : 'Charlie Davis';
    
    MOCK_PROGRAMS.forEach(prog => {
      if (ids.includes(prog.id)) {
        const hasMentor = prog.mentors.some(m => m.id === mentorId);
        if (!hasMentor) {
          prog.mentors.push({
            id: mentorId,
            name: mentorName,
            department: 'Technical Engineering',
            assignedStudents: 0,
            sessionsConducted: 0,
            rating: 5.0,
            successRate: 100,
            satisfaction: 5.0,
            completionContribution: 100
          });
        }
        prog.mentorsAssigned = prog.mentors.length;
        prog.timeline.unshift({
          date: new Date().toISOString().split('T')[0],
          title: 'Mentor Assigned',
          description: `Assigned new program mentor ${mentorName} via bulk operations.`,
          type: 'mentor'
        });
      }
    });
    return true;
  },

  async createProgram(programData: Omit<Program, 'id' | 'timeline' | 'enrollments' | 'curriculum' | 'certifications'> & { id?: string }): Promise<Program> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const id = programData.id || `prog-${MOCK_PROGRAMS.length + 1}`;
    const newProg: Program = {
      ...programData,
      id,
      curriculum: [
        {
          name: 'Module 1: Getting Started & Foundations',
          topics: ['Introduction to domain', 'Configuring environment and sandboxes', 'Core syntax & libraries'],
          learningOutcomes: ['Understand key concepts', 'Install dependencies'],
          assessments: ['Initial Baseline Quiz'],
          assignments: ['Hello World Sandbox Setup'],
          projects: ['Foundational Capstone Project']
        }
      ],
      enrollments: [],
      certifications: {
        generated: 0,
        issued: 0,
        pending: 0,
        list: []
      },
      timeline: [
        { date: new Date().toISOString().split('T')[0], title: 'Program Created', description: `New training program ${programData.title} was initialized.`, type: 'created' }
      ]
    };
    MOCK_PROGRAMS.push(newProg);
    return newProg;
  }
};
