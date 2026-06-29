import { MentorProfile, MentorAssignment, MentorBatchMapping } from '../types/api/mentor.types';
import { mentorApi } from '../api/mentor.api';

export const mentorService = {
  async getMentorProfiles(): Promise<MentorProfile[]> {
        const data = await mentorApi.getMentorProfiles();
        return data;
    },

  async getMentorProfile(id: string): Promise<MentorProfile | undefined> {
      const data = await mentorApi.getMentorProfile(id);
      return data;
  },

  async createMentorProfile(
    profile: Omit<MentorProfile, 'mentor_profile_id' | 'created_at' | 'updated_at'>
  ): Promise<MentorProfile> {
      const data = await mentorApi.createMentorProfile(profile);
      return data;
  },

  async updateMentorProfile(
    id: string,
    updates: Partial<Pick<MentorProfile, 'mentor_bio' | 'mentor_expertise' | 'years_of_experience' | 'max_student_capacity' | 'is_available'>>
  ): Promise<MentorProfile | undefined> {
      const data = await mentorApi.updateMentorProfile(id, updates);
      return data;
  },

  async getAssignments(): Promise<MentorAssignment[]> {
      const data = await mentorApi.getAssignments();
      return data;
  },

  async createAssignment(
    assignment: Omit<MentorAssignment, 'id'>
  ): Promise<MentorAssignment> {
      const data = await mentorApi.createAssignment(assignment);
      return data;
  },

  async getBatchMappings(): Promise<MentorBatchMapping[]> {
      const data = await mentorApi.getBatchMappings();
      return data;
  },

  async createBatchMapping(
    mapping: Omit<MentorBatchMapping, 'id'>
  ): Promise<MentorBatchMapping> {
      const data = await mentorApi.createBatchMapping(mapping);
      return data;
  },

  /** @deprecated Use getMentorProfiles */
  async getMentors(): Promise<MentorProfile[]> {
    return this.getMentorProfiles();
  },

  /** @deprecated Use getMentorProfile */
  async getMentor(id: string): Promise<MentorProfile | undefined> {
    return this.getMentorProfile(id);
  },
};
