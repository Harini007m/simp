import { EmailTemplate, EmailHistory } from '../types/email.types';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const emailApi = {
  getTemplates: async (): Promise<EmailTemplate[]> => {
    await delay(500);
    throw new Error('Backend implementation pending or failed');
  },
  getHistory: async (): Promise<EmailHistory[]> => {
    await delay(700);
    throw new Error('Backend implementation pending or failed');
  },
  saveTemplate: async (data: Partial<EmailTemplate>): Promise<EmailTemplate> => {
    await delay(400);
    let template = ([] as any[]).find(t => t.id === data.id);
    if (template) {
      Object.assign(template, { ...data, lastUpdated: new Date().toISOString(), version: template.version + 1 });
    } else {
      template = {
        id: `tpl-${([] as any[]).length + 1}`,
        name: data.name || '',
        category: data.category || 'General' as any,
        subject: data.subject || '',
        htmlBody: data.htmlBody || '',
        variables: data.variables || [],
        status: data.status || 'Draft',
        createdBy: data.createdBy || 'Current User',
        version: 1,
        lastUpdated: new Date().toISOString()
      };
      ([] as any[]).push(template);
    }
    return template;
  }
};
