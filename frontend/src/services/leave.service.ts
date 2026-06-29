import { leaveApi } from '../api/leave.api';
import { LeaveRequest } from '../types/leave.types';
export const leaveService = {
  getLeaveDashboardStats: async () => {
    const leaves = await leaveService.getAllLeaves();
    return {
      totalRequests: leaves.length,
      pendingRequests: leaves.filter(l => l.status === 'Pending').length,
      approvedRequests: leaves.filter(l => l.status === 'Approved').length,
      rejectedRequests: leaves.filter(l => l.status === 'Rejected').length,
    };
  },

  getPendingLeaves: async (): Promise<LeaveRequest[]> => {
    const leaves = await leaveService.getAllLeaves();
    return leaves.filter(l => l.status === 'Pending');
  },

  getAllLeaves: async (): Promise<LeaveRequest[]> => {
      const data = await leaveApi.getAllLeaves();
      return data;
  },

  applyLeave: async (leaveData: Omit<LeaveRequest, 'id'>) => {
      const data = await leaveApi.createLeave(leaveData);
      return data;
  }
};
