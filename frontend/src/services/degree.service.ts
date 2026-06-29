import { degreeApi } from '../api/degree.api';
import { DegreeResponse } from '../types/api/degree.types';
export const degreeService = {
  async getDegrees(): Promise<DegreeResponse[]> {
        const data = await degreeApi.getDegrees();
        return data;
    }
};
