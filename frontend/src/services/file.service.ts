import { apiClient } from '../api/api.client';
import { CommonFile, FileReference } from '../types/api/common-file.types';

class FileService {


  async getFiles(): Promise<CommonFile[]> {
    const res = await apiClient.get<CommonFile[]>('/files');
    return res.data;
  }

  async getFile(fileId: string): Promise<CommonFile | undefined> {
    const res = await apiClient.get<CommonFile>(`/files/${fileId}`);
    return res.data;
  }

  async uploadFile(file: Partial<CommonFile>): Promise<CommonFile> {
    const res = await apiClient.post<CommonFile>('/files/upload', file);
    return res.data;
  }

  async deleteFile(fileId: string): Promise<void> {
    await apiClient.delete(`/files/${fileId}`);
  }

  async linkFileToEntity(fileId: string, entityType: string, entityId: string): Promise<FileReference> {
    const res = await apiClient.post<FileReference>(`/files/${fileId}/link`, { entityType, entityId });
    return res.data;
  }

  async getReferencesForEntity(entityType: string, entityId: string): Promise<CommonFile[]> {
    const res = await apiClient.get<CommonFile[]>(`/files/entity/${entityType}/${entityId}`);
    return res.data;
  }
}

export const fileService = new FileService();
