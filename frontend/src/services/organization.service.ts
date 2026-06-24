import { Organization, MOCK_ORGANIZATIONS } from '../data/mock-organizations';

export const organizationService = {
  async getOrganizations(): Promise<Organization[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_ORGANIZATIONS];
  },

  async getOrganization(id: string): Promise<Organization | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_ORGANIZATIONS.find(org => org.id === id);
  },

  async updateOrganization(id: string, updates: Partial<Organization>): Promise<Organization | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const idx = MOCK_ORGANIZATIONS.findIndex(org => org.id === id);
    if (idx !== -1) {
      MOCK_ORGANIZATIONS[idx] = {
        ...MOCK_ORGANIZATIONS[idx],
        ...updates
      };
      return MOCK_ORGANIZATIONS[idx];
    }
    return undefined;
  },

  async bulkUpdatePartnership(ids: string[], status: Organization['partnershipStatus']): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    MOCK_ORGANIZATIONS.forEach(org => {
      if (ids.includes(org.id)) {
        const oldStatus = org.partnershipStatus;
        org.partnershipStatus = status;
        // Also sync compatible status property
        org.status = (status === 'Active' || status === 'Pending Verification') ? 'Active' : 'Inactive';
        org.timeline.unshift({
          date: new Date().toISOString().split('T')[0],
          title: 'Bulk Partnership Update',
          description: `Partnership status transitioned from ${oldStatus} to ${status} via bulk operations.`,
          type: 'renewal'
        });
      }
    });
    return true;
  },

  async bulkAssignCoordinator(ids: string[], coordinatorName: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    MOCK_ORGANIZATIONS.forEach(org => {
      if (ids.includes(org.id)) {
        const newCoord = {
          id: `coord-${Date.now()}-${Math.round(Math.random() * 100)}`,
          name: coordinatorName,
          email: `${coordinatorName.toLowerCase().replace(/\s+/g, '_')}@${org.name.toLowerCase().replace(/\s+/g, '')}.edu`,
          phone: '+1 (555) 012-3849',
          department: 'General Administration',
          studentsManaged: 0,
          programsManaged: 0,
          status: 'Active' as const,
          kpis: { applicationsProcessed: 0, attendanceApprovals: 0, internshipCompletions: 0, placementSuccess: 0 }
        };
        org.coordinators.push(newCoord);
        org.timeline.unshift({
          date: new Date().toISOString().split('T')[0],
          title: 'Coordinator Assigned',
          description: `Assigned new coordinator ${coordinatorName} to organization.`,
          type: 'coordinator'
        });
      }
    });
    return true;
  },

  async createOrganization(orgData: Omit<Organization, 'id' | 'timeline' | 'documents'> & { id?: string }): Promise<Organization> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const id = orgData.id || `org-${MOCK_ORGANIZATIONS.length + 1}`;
    const newOrg: Organization = {
      ...orgData,
      id,
      documents: [
        { type: 'MoU', name: `${orgData.name.toLowerCase().replace(/\s+/g, '_')}_draft_mou.pdf`, uploadDate: new Date().toISOString().split('T')[0], status: 'Pending', version: 'v1.0', previewContent: `Memorandum of Understanding draft for ${orgData.name}.` }
      ],
      timeline: [
        { date: new Date().toISOString().split('T')[0], title: 'College Registered', description: `${orgData.name} registered as a partner institution.`, type: 'added' }
      ]
    };
    MOCK_ORGANIZATIONS.push(newOrg);
    return newOrg;
  }
};
