import { Invoice, Receipt } from '../types/billing.types';
export const billingApi = {
  getInvoices: async (): Promise<Invoice[]> => {
    throw new Error('Backend implementation pending or failed');
  },
  getReceipts: async (): Promise<Receipt[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
