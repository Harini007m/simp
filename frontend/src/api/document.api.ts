import { GeneratedDocument, DocumentTemplate } from '../types/document.types';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const DocumentApi = {
  getGeneratedDocuments: async (): Promise<GeneratedDocument[]> => {
    await delay(500);
    throw new Error('Backend implementation pending or failed');
  },
  
  getTemplates: async (): Promise<DocumentTemplate[]> => {
    await delay(300);
    throw new Error('Backend implementation pending or failed');
  },

  createGeneratedDocument: async (doc: Partial<GeneratedDocument>): Promise<GeneratedDocument> => {
    await delay(400);
    const newDoc: GeneratedDocument = {
      id: `doc_${([] as any[]).length + 1}`,
      templateId: doc.templateId || 'tpl_1',
      studentId: doc.studentId || 'std_1',
      studentName: doc.studentName || 'New Student',
      program: doc.program || 'Full Stack Web Development',
      type: doc.type || 'Offer Letter',
      status: 'Generated',
      generatedDate: new Date().toISOString(),
      version: 'v1.0',
      fileUrl: `https://example.com/documents/doc_${([] as any[]).length + 1}.pdf`,
      metadata: doc.metadata || { generatedBy: 'User Action' }
    };
    ([] as any[]).unshift(newDoc);
    return newDoc;
  },

  updateDocumentStatus: async (id: string, status: 'Draft' | 'Generated' | 'Sent' | 'Signed'): Promise<GeneratedDocument> => {
    await delay(300);
    const doc = ([] as any[]).find(d => d.id === id);
    if (!doc) throw new Error('Document not found');
    doc.status = status;
    return doc;
  }
};
