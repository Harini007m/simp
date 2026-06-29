import { UserSession } from '../types/api/user-session.types';
import { sessionApi } from "../api/session.api";

class SessionService {
  async getSessions(): Promise<UserSession[]> {
      return sessionApi.getSessions();
  }

  async terminateSession(id: string): Promise<void> {
      return sessionApi.terminateSession(id);
  }
}

export const sessionService = new SessionService();
