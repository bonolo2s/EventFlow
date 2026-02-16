"use client";

import { CalendarDays, Users, TrendingUp, Ticket } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { useRouter } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function DashboardHome() {
  const { events, currentUser } = useApp();
  const { navigate } = useRouter();

  const myEvents = events.filter((e) => e.creatorId === currentUser?.id);
  const totalBookings = myEvents.reduce(
    (sum, e) => sum + e.bookings.length,
    0
  );
  const totalCapacity = myEvents.reduce((sum, e) => sum + e.capacity, 0);
  const fillRate =
    totalCapacity > 0
      ? Math.round((totalBookings / totalCapacity) * 100)
      : 0;

  const recentBookings = myEvents
    .flatMap((e) =>
      e.bookings.map((b) => ({ ...b, eventTitle: e.title }))
    )
    .sort(
      (a, b) =>
        new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
    )
    .slice(0, 5);

  const statCards = [
    {
      label: "Total Events",
      value: myEvents.length,
      icon: CalendarDays,
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: Ticket,
    },
    {
      label: "Total Capacity",
      value: totalCapacity,
      icon: Users,
    },
    {
      label: "Fill Rate",
      value: `${fillRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            {"Here's an overview of your events."}
          </p>
        </div>
        <Button
          onClick={() => navigate("dashboard-create")}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
        >
          Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/60 bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className="h-5 w-5 text-primary/60" />
            </div>
            <p className="mt-2 font-heading text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="mt-8">
        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
          Recent Bookings
        </h2>
        {recentBookings.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No bookings yet. Share your events to start getting bookings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60 bg-card">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Attendee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Event
                  </th>
                  <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-muted/20">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {b.attendeeName}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {b.eventTitle}
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-muted-foreground md:table-cell">
                      {b.attendeeEmail}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {format(new Date(b.bookedAt), "MMM d, yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
