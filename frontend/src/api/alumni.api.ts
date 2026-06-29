import { AlumniProfile } from '../types/alumni.types';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const AlumniApi = {
  getAlumni: async (): Promise<AlumniProfile[]> => {
    await delay(500);
    throw new Error('Backend implementation pending or failed');
  },

  createAlumni: async (alumni: Partial<AlumniProfile>): Promise<AlumniProfile> => {
    const newAlumni: AlumniProfile = {
      id: `alumni_${([] as any[]).length + 1}`,
      studentId: alumni.studentId || `std_alumni_${([] as any[]).length + 1}`,
      name: alumni.name || 'New Alumni',
      email: alumni.email || 'alumni@example.com',
      phone: alumni.phone || '1234567890',
      batch: alumni.batch || 'Class of 2025',
      graduationYear: alumni.graduationYear || 2025,
      program: alumni.program || 'Web Development',
      currentCompany: alumni.currentCompany || 'Self-Employed',
      currentDesignation: alumni.currentDesignation || 'Software Engineer',
      linkedInUrl: alumni.linkedInUrl || 'https://linkedin.com',
      isMentoring: alumni.isMentoring || false,
      achievements: ['Completed internship'],
      referralsProvided: 0,
      lastUpdated: new Date().toISOString(),
      careerHistory: [{
        id: `cp_${([] as any[]).length + 1}_1`,
        companyName: alumni.currentCompany || 'Self-Employed',
        designation: alumni.currentDesignation || 'Software Engineer',
        location: 'Bangalore',
        startDate: new Date().toISOString(),
        isCurrent: true
      }]
    };
    ([] as any[]).unshift(newAlumni);
    return newAlumni;
  }
};
