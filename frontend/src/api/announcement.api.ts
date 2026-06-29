import { Announcement } from '../types/announcement.types';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const announcementApi = {
  getAnnouncements: async (): Promise<Announcement[]> => {
    await delay(600);
    throw new Error('Backend implementation pending or failed');
  },
  createAnnouncement: async (data: Partial<Announcement>): Promise<Announcement> => {
    await delay(500);
    const newAnnouncement: Announcement = {
      id: `ann-${([] as any[]).length + 1}`,
      title: data.title || '',
      description: data.description || '',
      audience: data.audience || ['All'],
      category: data.category || 'General',
      priority: data.priority || 'Normal',
      attachments: data.attachments || [],
      publishDate: data.publishDate || new Date().toISOString(),
      status: data.status || 'Draft',
      pinned: data.pinned || false,
      author: data.author || 'Current User'
    };
    ([] as any[]).push(newAnnouncement);
    return newAnnouncement;
  }
};
