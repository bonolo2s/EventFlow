"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Booking, EventItem, User } from "./types";
import { mockEvents, mockUsers } from "./mock-data";

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (fullName: string, email: string, password: string) => boolean;
  logout: () => void;

  // Events
  events: EventItem[];
  createEvent: (event: Omit<EventItem, "id" | "bookings" | "creatorId">) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;

  // Bookings
  bookEvent: (eventId: string, name: string, email: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<(User & { password: string })[]>(
    mockUsers.map((u) => ({ ...u, password: "password123" }))
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [events, setEvents] = useState<EventItem[]>(mockEvents);

  const login = useCallback(
    (email: string, password: string): boolean => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const { password: _, ...safeUser } = user;
        setCurrentUser(safeUser);
        return true;
      }
      return false;
    },
    [users]
  );

  const register = useCallback(
    (fullName: string, email: string, password: string): boolean => {
      if (users.find((u) => u.email === email)) return false;
      const newUser = {
        id: `u${Date.now()}`,
        fullName,
        email,
        role: "admin" as const,
        password,
      };
      setUsers((prev) => [...prev, newUser]);
      const { password: _, ...safeUser } = newUser;
      setCurrentUser(safeUser);
      return true;
    },
    [users]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const createEvent = useCallback(
    (event: Omit<EventItem, "id" | "bookings" | "creatorId">) => {
      if (!currentUser) return;
      const newEvent: EventItem = {
        ...event,
        id: `e${Date.now()}`,
        bookings: [],
        creatorId: currentUser.id,
      };
      setEvents((prev) => [...prev, newEvent]);
    },
    [currentUser]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      setEvents((prev) =>
        prev.filter(
          (e) => !(e.id === id && e.creatorId === currentUser?.id)
        )
      );
    },
    [currentUser]
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<EventItem>) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === id && e.creatorId === currentUser?.id
            ? { ...e, ...updates }
            : e
        )
      );
    },
    [currentUser]
  );

  const bookEvent = useCallback(
    (eventId: string, name: string, email: string): boolean => {
      const event = events.find((e) => e.id === eventId);
      if (!event || event.bookings.length >= event.capacity) return false;
      if (event.bookings.find((b) => b.attendeeEmail === email)) return false;

      const newBooking: Booking = {
        id: `b${Date.now()}`,
        eventId,
        attendeeName: name,
        attendeeEmail: email,
        bookedAt: new Date().toISOString(),
      };
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? { ...e, bookings: [...e.bookings, newBooking] }
            : e
        )
      );
      return true;
    },
    [events]
  );

  const value = useMemo(
    () => ({
      currentUser,
      login,
      register,
      logout,
      events,
      createEvent,
      deleteEvent,
      updateEvent,
      bookEvent,
    }),
    [
      currentUser,
      login,
      register,
      logout,
      events,
      createEvent,
      deleteEvent,
      updateEvent,
      bookEvent,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
