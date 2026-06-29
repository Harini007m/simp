import { Allocation } from '../types/api/allocation.types';
import { allocationApi } from "../api/allocation.api";

export const allocationService = {
  async getAllocations(): Promise<Allocation[]> {
        return allocationApi.getAllocations();
    },

  async getAllocation(id: string): Promise<Allocation | undefined> {
      return allocationApi.getAllocation(id);
  },

  async getAllocationsByBatch(batchId: string): Promise<Allocation[]> {
      return allocationApi.getAllocationsByBatch(batchId);
  },

  async updateAllocation(id: string, updates: Partial<Allocation>): Promise<Allocation | undefined> {
      return allocationApi.updateAllocation(id, updates);
  },

  async createAllocation(
    allocData: Omit<Allocation, 'id' | 'timeline'> & { id?: string }
  ): Promise<Allocation> {
      return allocationApi.createAllocation(allocData);
  },

  async bulkUpdateStatus(ids: string[], status: Allocation['status']): Promise<boolean> {
      return allocationApi.bulkUpdateStatus(ids, status);
  },

  async bulkReallocate(ids: string[], fields: Partial<Allocation>): Promise<boolean> {
      return allocationApi.bulkReallocate(ids, fields);
  },

  async autoResolveConflicts(): Promise<boolean> {
      return allocationApi.autoResolveConflicts();
  }
};
