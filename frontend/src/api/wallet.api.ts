import { WalletTransaction } from '../types/wallet.types';
export const walletApi = {
  getTransactions: async (): Promise<WalletTransaction[]> => {
    throw new Error('Backend implementation pending or failed');
  }
};
