import { PlacementRecord, Company } from '../types/placement.types';
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const PlacementApi = {
  getPlacements: async (): Promise<PlacementRecord[]> => {
    await delay(500);
    throw new Error('Backend implementation pending or failed');
  },
  
  getCompanies: async (): Promise<Company[]> => {
    await delay(400);
    throw new Error('Backend implementation pending or failed');
  },

  createCompany: async (company: Partial<Company>): Promise<Company> => {
    await delay(300);
    const newCompany: Company = {
      id: `comp_${([] as any[]).length + 1}`,
      name: company.name || 'New Company Solutions',
      industry: company.industry || 'IT Services',
      website: company.website || 'https://example.com',
      contactPerson: company.contactPerson || 'HR Manager',
      contactEmail: company.contactEmail || 'hr@example.com',
      activeRoles: company.activeRoles || 1
    };
    ([] as any[]).unshift(newCompany);
    return newCompany;
  }
};
