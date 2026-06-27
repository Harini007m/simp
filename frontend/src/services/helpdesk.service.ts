import { HelpdeskAPI } from '../api/helpdesk.api';
import { Ticket, KnowledgeBaseArticle, TicketComment, TicketStatus } from '../types/helpdesk.types';

export class HelpdeskService {
  static async getTickets(): Promise<Ticket[]> {
    const tickets = await HelpdeskAPI.getTickets();
    return tickets.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  static async getMyTickets(userId: string): Promise<Ticket[]> {
    const tickets = await HelpdeskAPI.getTickets();
    return tickets.filter(t => t.createdBy === userId || t.assignedTo === userId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  static async getTicketById(id: string): Promise<Ticket | null> {
    return HelpdeskAPI.getTicketById(id);
  }

  static async getKnowledgeBase(): Promise<KnowledgeBaseArticle[]> {
    return HelpdeskAPI.getKBArticles();
  }

  static async createTicket(ticket: Partial<Ticket>): Promise<Ticket> {
    return HelpdeskAPI.createTicket(ticket);
  }

  static async addComment(ticketId: string, authorId: string, authorName: string, content: string): Promise<TicketComment> {
    return HelpdeskAPI.addComment(ticketId, authorId, authorName, content);
  }

  static async updateTicketStatus(ticketId: string, status: TicketStatus, assigneeId?: string, assigneeName?: string): Promise<Ticket> {
    return HelpdeskAPI.updateTicketStatus(ticketId, status, assigneeId, assigneeName);
  }
}
