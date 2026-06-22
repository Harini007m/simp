import { Batch, MOCK_BATCHES } from '../data/mock-batches';

export const batchService = {
  async getBatches(): Promise<Batch[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_BATCHES;
  },

  async getBatch(id: string): Promise<Batch | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_BATCHES.find(batch => batch.id === id);
  },

  async getBatchesByProgram(progId: string): Promise<Batch[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_BATCHES.filter(batch => batch.programId === progId);
  }
};
