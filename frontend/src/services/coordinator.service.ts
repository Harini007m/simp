
import { Coordinator, CollegeReport } from '../types/api/coordinator.types';
import { coordinatorApi } from '../api/coordinator.api';

class CoordinatorService {
  async getCoordinators(): Promise<Coordinator[]> {
      const data = await coordinatorApi.getCoordinators();
      return data;
  }

  async getCoordinator(id: string): Promise<Coordinator | undefined> {
      const data = await coordinatorApi.getCoordinator(id);
      return data;
  }

  async getReports(coordinatorId: string): Promise<CollegeReport[]> {
      const data = await coordinatorApi.getReports(coordinatorId);
      return data;
  }
}

export const coordinatorService = new CoordinatorService();
