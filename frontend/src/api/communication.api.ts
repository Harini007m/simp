import { Conversation, Message } from '../types/communication.types';
import { apiClient } from './api.client';

export const communicationApi = {
  getConversations: async (userId: string): Promise<Conversation[]> => {
    const res = await apiClient.get<Conversation[]>(`/communication/conversations?userId=${userId}`);
    return res.data;
  },
  
  getMessages: async (conversationId: string): Promise<Message[]> => {
    const res = await apiClient.get<Message[]>(`/communication/conversations/${conversationId}/messages`);
    return res.data;
  },
  
  sendMessage: async (data: Partial<Message>): Promise<Message> => {
    const res = await apiClient.post<Message>('/communication/messages', data);
    return res.data;
  },

  createConversation: async (data: Partial<Conversation>): Promise<Conversation> => {
    const res = await apiClient.post<Conversation>('/communication/conversations', data);
    return res.data;
  },

  markMessageAsRead: async (messageId: string): Promise<void> => {
    await apiClient.put(`/communication/messages/${messageId}/read`, {});
  }
};
