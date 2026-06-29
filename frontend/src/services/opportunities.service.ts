import { opportunityApi } from '../api/opportunity.api';
import { OpeningCreate, OpeningResponse } from '../types/api/opportunity.types';
import { Opportunity } from '../types/api/opportunity.types';
import { opportunitiesApi } from "../api/opportunities.api";

export type ExtendedOpening = OpeningResponse & Opportunity;

class OpportunitiesService {
  mapToExtended(opp: OpeningResponse): ExtendedOpening {
    return {
      ...opp,
      id: opp.opening_id,
      title: opp.project_title || opp.role_name,
      type: 'Internship',
      value: 'stipend',
      description: opp.role_description,
      duration: '6 Months',
      mode: 'Remote',
      seats: '10',
      eligibility: 'Any Degree',
      startDate: opp.created_at || new Date().toISOString(),
      color: 'from-blue-600/20 to-cyan-600/20 border-blue-500/30 text-blue-400',
      internshipType: 'stipend',
      amount: '$0',
      programId: opp.program_id,
      status: 'Open' as any,
      postedDate: opp.created_at?.split('T')[0] || ''
    } as any;
  }

  async getOpportunities(): Promise<ExtendedOpening[]> {
    try {
      const data = await opportunityApi.getOpenings();
      return data.map((opp: any) => this.mapToExtended(opp));
    } catch {
      return [];
    }
  }

  async getOpportunity(id: string): Promise<ExtendedOpening | undefined> {
    try {
      const opp = await opportunityApi.getOpening(id);
      return this.mapToExtended(opp);
    } catch {
      return undefined;
    }
  }

  async createOpportunity(opp: OpeningCreate): Promise<ExtendedOpening> {
      const response = await opportunitiesApi.createOpportunity(opp);
      return this.mapToExtended(response);
  }
}

export const opportunitiesService = new OpportunitiesService();
