"use client";

import { CalendarDays, Users, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { useRouter } from "@/lib/router";
import { format } from "date-fns";

export function DashboardEvents() {
  const { events, currentUser, deleteEvent } = useApp();
  const { navigate } = useRouter();

  const myEvents = events.filter((e) => e.creatorId === currentUser?.id);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            My Events
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage and track all your events.
          </p>
        </div>
        <Button
          onClick={() => navigate("dashboard-create")}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
        >
          Create Event
        </Button>
      </div>

      {myEvents.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            No events yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first event and start accepting bookings.
          </p>
          <Button
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("dashboard-create")}
          >
            Create Event
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {myEvents.map((event) => {
            const spotsLeft = event.capacity - event.bookings.length;
            return (
              <div
                key={event.id}
                className="rounded-xl border border-border/60 bg-card p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          spotsLeft <= 0
                            ? "bg-destructive/10 text-destructive"
                            : spotsLeft < 10
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {spotsLeft <= 0
                          ? "Full"
                          : `${spotsLeft} spots left`}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-primary/60" />
                        {format(new Date(event.startDate), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-primary/60" />
                        {event.bookings.length} / {event.capacity} booked
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate("event-detail", { eventId: event.id })
                      }
                      className="flex-1 text-foreground sm:flex-none"
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteEvent(event.id)}
                      className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive sm:flex-none"
                    >
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Bookings Table */}
                {event.bookings.length > 0 && (
                  <div className="mt-4 overflow-x-auto rounded-lg border border-border/40">
                    <table className="w-full min-w-[400px]">
                      <thead>
                        <tr className="bg-muted/40">
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Attendee
                          </th>
                          <th className="hidden px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                            Email
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Booked On
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {event.bookings.map((b) => (
                          <tr key={b.id}>
                            <td className="px-4 py-2.5 text-sm text-foreground">
                              {b.attendeeName}
                            </td>
                            <td className="hidden px-4 py-2.5 text-sm text-muted-foreground sm:table-cell">
                              {b.attendeeEmail}
                            </td>
                            <td className="px-4 py-2.5 text-sm text-muted-foreground">
                              {format(
                                new Date(b.bookedAt),
                                "MMM d, yyyy"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
