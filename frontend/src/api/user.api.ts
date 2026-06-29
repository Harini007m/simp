import { apiClient } from './api.client';
import { User } from "../types/api/user.types";

export const userApi = {
    async getUsers(): Promise<User[]> {
        const response = await apiClient.get('/user');
        return response.data;
    },
    async getUser(id: string): Promise<User | undefined> {
        const response = await apiClient.get('/user');
        return response.data;
    },
    async getUserByEmail(email: string): Promise<User | undefined> {
        const response = await apiClient.get('/user');
        return response.data;
    },
    async createUser(user: Omit<User, 'id' | 'date' | 'avatar'> & { avatar?: string }): Promise<User> {
        const response = await apiClient.get('/user');
        return response.data;
    },
    async updateUser(id: string, updatedData: Partial<User>): Promise<User | undefined> {
        const response = await apiClient.get('/user');
        return response.data;
    },
    async deleteUser(id: string): Promise<boolean> {
        const response = await apiClient.get('/user');
        return response.data;
    }
};
