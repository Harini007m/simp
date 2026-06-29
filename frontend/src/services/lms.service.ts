import { LearningModule } from '../types/api/lms.types';
import { lmsApi } from '../api/lms.api';

class LMSService {
  async getModules(): Promise<LearningModule[]> {
      const data = await lmsApi.getModules();
      return data;
  }

  async getModule(id: string): Promise<LearningModule | undefined> {
      const data = await lmsApi.getModule(id);
      return data;
  }

  async getModulesForProgram(programId: string): Promise<LearningModule[]> {
      const data = await lmsApi.getModulesForProgram(programId);
      return data;
  }
}

export const lmsService = new LMSService();
