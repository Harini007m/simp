import { DigitalIDCard } from '../types/idcard.types';
const DELAY = 500;

export const IDCardAPI = {
  getIDCards: async (): Promise<DigitalIDCard[]> => {
    throw new Error('Backend implementation pending or failed');
  },

  getMyIDCard: async (studentId: string): Promise<DigitalIDCard | null> => {
    throw new Error('Backend implementation pending or failed');
  }
};
