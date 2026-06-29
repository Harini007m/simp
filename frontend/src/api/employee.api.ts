import { apiClient } from './api.client';
import { EmployeeCreate, EmployeeResponse } from '../types/api/employee.types';

export const employeeApi = {
  getEmployees: async (): Promise<EmployeeResponse[]> => {
    const res = await apiClient.get<EmployeeResponse[]>('/employees');
    return res.data;
  },
  createEmployee: async (data: EmployeeCreate): Promise<EmployeeResponse> => {
    const res = await apiClient.post<EmployeeResponse>('/employees', data);
    return res.data;
  },
  getEmployee: async (id: string): Promise<EmployeeResponse> => {
    const res = await apiClient.get<EmployeeResponse>(`/employees/${id}`);
    return res.data;
  },
  updateEmployee: async (id: string, data: any): Promise<EmployeeResponse> => {
    const res = await apiClient.put<EmployeeResponse>(`/employees/${id}`, data);
    return res.data;
  },
  deleteEmployee: async (id: string): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  }
};
