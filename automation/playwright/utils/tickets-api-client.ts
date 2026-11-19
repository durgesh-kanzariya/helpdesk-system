import { APIRequestContext, APIResponse } from '@playwright/test';

export interface CreateTicketPayload {
  title: string;
  status: string;
  userId: number;
  categoryId: number;
}

export interface UpdateTicketPayload {
  id: number;
  title: string;
  status: string;
  userId: number;
  categoryId: number;
}

export class TicketsApiClient {
  constructor(private request: APIRequestContext) {}

  async createTicket(payload: CreateTicketPayload): Promise<APIResponse> {
    return this.request.post('/api/Tickets', { data: payload });
  }

  async getAllTickets(): Promise<APIResponse> {
    return this.request.get('/api/Tickets');
  }

  async getTicketById(id: number): Promise<APIResponse> {
    return this.request.get(`/api/Tickets/${id}`);
  }

  async updateTicket(id: number, payload: UpdateTicketPayload): Promise<APIResponse> {
    return this.request.put(`/api/Tickets/${id}`, { data: payload });
  }

  async deleteTicket(id: number): Promise<APIResponse> {
    return this.request.delete(`/api/Tickets/${id}`);
  }
}
