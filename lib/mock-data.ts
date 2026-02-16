import type { EventItem, User } from "./types";

export const mockUsers: User[] = [
  {
    id: "u1",
    fullName: "Alex Johnson",
    email: "alex@eventflow.io",
    role: "admin",
  },
];

export const mockEvents: EventItem[] = [
  {
    id: "e1",
    title: "React Summit 2026",
    description:
      "A premier conference bringing together the brightest minds in React development. Learn about the latest patterns, performance techniques, and the future of the framework from industry leaders.",
    startDate: "2026-04-15T09:00:00",
    endDate: "2026-04-16T18:00:00",
    capacity: 300,
    creatorId: "u1",
    bookings: [
      {
        id: "b1",
        eventId: "e1",
        attendeeName: "Sarah Miller",
        attendeeEmail: "sarah@example.com",
        bookedAt: "2026-02-10T14:30:00",
      },
      {
        id: "b2",
        eventId: "e1",
        attendeeName: "James Kofi",
        attendeeEmail: "james@example.com",
        bookedAt: "2026-02-11T09:15:00",
      },
      {
        id: "b3",
        eventId: "e1",
        attendeeName: "Priya Sharma",
        attendeeEmail: "priya@example.com",
        bookedAt: "2026-02-12T16:45:00",
      },
    ],
  },
  {
    id: "e2",
    title: "Startup Pitch Night",
    description:
      "An electrifying evening where early-stage founders present their ideas to a panel of investors and industry mentors. Network, learn, and maybe find your next big opportunity.",
    startDate: "2026-03-22T18:00:00",
    endDate: "2026-03-22T22:00:00",
    capacity: 100,
    creatorId: "u1",
    bookings: [
      {
        id: "b4",
        eventId: "e2",
        attendeeName: "Omar Farouk",
        attendeeEmail: "omar@example.com",
        bookedAt: "2026-02-08T11:00:00",
      },
    ],
  },
  {
    id: "e3",
    title: "Design Systems Workshop",
    description:
      "A hands-on workshop for designers and developers to build scalable, consistent design systems from scratch. Bring your laptop and leave with a production-ready component library.",
    startDate: "2026-05-10T10:00:00",
    endDate: "2026-05-10T16:00:00",
    capacity: 50,
    creatorId: "u1",
    bookings: [],
  },
  {
    id: "e4",
    title: "Cloud Architecture Masterclass",
    description:
      "Deep dive into modern cloud architecture patterns. From microservices to serverless, learn how to build resilient, scalable systems that handle millions of requests.",
    startDate: "2026-06-05T09:00:00",
    endDate: "2026-06-06T17:00:00",
    capacity: 150,
    creatorId: "u1",
    bookings: [
      {
        id: "b5",
        eventId: "e4",
        attendeeName: "Chen Wei",
        attendeeEmail: "chen@example.com",
        bookedAt: "2026-02-14T08:20:00",
      },
      {
        id: "b6",
        eventId: "e4",
        attendeeName: "Lisa Mwangi",
        attendeeEmail: "lisa@example.com",
        bookedAt: "2026-02-14T10:45:00",
      },
    ],
  },
];
