import { CalendarEvent } from '../types/calendar.types';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const calendarApi = {
  getEvents: async (): Promise<CalendarEvent[]> => {
    await delay(600);
    throw new Error('Backend implementation pending or failed');
  },
  createEvent: async (data: Partial<CalendarEvent>): Promise<CalendarEvent> => {
    await delay(400);
    const newEvent: CalendarEvent = {
      id: `evt-${([] as any[]).length + 1}`,
      title: data.title || '',
      description: data.description || '',
      type: data.type || 'Meeting',
      startTime: data.startTime || new Date().toISOString(),
      endTime: data.endTime || new Date(Date.now() + 3600000).toISOString(),
      participants: data.participants || [],
      location: data.location,
      meetingLink: data.meetingLink,
      reminderMinutes: data.reminderMinutes || 15,
      repeatRule: data.repeatRule || 'None',
      status: data.status || 'Scheduled'
    };
    ([] as any[]).push(newEvent);
    return newEvent;
  }
};
