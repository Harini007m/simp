import { Course, MOCK_LMS_COURSES } from '../data/mock-lms-courses';

export const lmsService = {
  async getCourses(): Promise<Course[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_LMS_COURSES;
  },

  async getCourse(id: string): Promise<Course | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_LMS_COURSES.find(c => c.id === id);
  }
};
