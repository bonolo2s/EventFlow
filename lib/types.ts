export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  bookings: Booking[];
  creatorId: string;
}

export interface Booking {
  id: string;
  eventId: string;
  attendeeName: string;
  attendeeEmail: string;
  bookedAt: string;
}
