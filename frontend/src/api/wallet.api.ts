import { apiClient } from './api.client';
import { WalletTransaction } from '../types/wallet.types';
export const walletApi = {
  getTransactions: async (): Promise<WalletTransaction[]> => {
    const res = await apiClient.get<WalletTransaction[]>('/wallet/transactions');
    return res.data;
  }
};
