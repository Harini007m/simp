import { apiClient } from './api.client';
import { Allocation } from "../types/api/allocation.types";

export const allocationApi = {
    async getAllocations(): Promise<Allocation[]> {
        const response = await apiClient.get('/allocation');
        return response.data;
    },
    async getAllocation(id: string): Promise<Allocation | undefined> {
        const response = await apiClient.get('/allocation');
        return response.data;
    },
    async getAllocationsByBatch(batchId: string): Promise<Allocation[]> {
        const response = await apiClient.get('/allocation');
        return response.data;
    },
    async updateAllocation(id: string, updates: Partial<Allocation>): Promise<Allocation | undefined> {
        const response = await apiClient.get('/allocation');
        return response.data;
    },
    async createAllocation(allocData: Omit<Allocation, 'id' | 'timeline'> & { id?: string }): Promise<Allocation> {
        const response = await apiClient.get('/allocation');
        return response.data;
    },
    async bulkUpdateStatus(ids: string[], status: Allocation['status']): Promise<boolean> {
        const response = await apiClient.get('/allocation');
        return response.data;
    },
    async bulkReallocate(ids: string[], fields: Partial<Allocation>): Promise<boolean> {
        const response = await apiClient.get('/allocation');
        return response.data;
    },
    async autoResolveConflicts(): Promise<boolean> {
        const response = await apiClient.get('/allocation');
        return response.data;
    }
};
