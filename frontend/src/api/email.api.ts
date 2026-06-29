import { EmailTemplate, EmailHistory } from '../types/email.types';
import { apiClient } from './api.client';

export const emailApi = {
  getTemplates: async (): Promise<EmailTemplate[]> => {
    const res = await apiClient.get<EmailTemplate[]>('/emails/templates');
    return res.data;
  },
  getHistory: async (): Promise<EmailHistory[]> => {
    const res = await apiClient.get<EmailHistory[]>('/emails/history');
    return res.data;
  },
  saveTemplate: async (data: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    if (data.id) {
      const res = await apiClient.put<EmailTemplate>(`/emails/templates/${data.id}`, data);
      return res.data;
    } else {
      const res = await apiClient.post<EmailTemplate>('/emails/templates', data);
      return res.data;
    }
  }
};
