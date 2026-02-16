"use client";

import { CalendarDays, MapPin, Users, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/lib/router";
import { useApp } from "@/lib/app-context";
import { format } from "date-fns";
import { useState } from "react";

export function EventsBrowse() {
  const { navigate } = useRouter();
  const { events } = useApp();
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <button
            onClick={() => navigate("landing")}
            className="font-heading text-xl font-bold tracking-tight text-foreground"
          >
            EventFlow
          </button>
          <div className="flex items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("landing")}
              className="hidden text-muted-foreground sm:inline-flex"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("login")}
              className="text-foreground/80 hover:text-foreground"
            >
              Log In
            </Button>
            <Button size="sm" onClick={() => navigate("register")} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Upcoming Events
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse and book tickets to amazing events. No account needed.
          </p>
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card pl-10"
            />
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No events found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEvents.map((event) => {
              const spotsLeft = event.capacity - event.bookings.length;
              const isFull = spotsLeft <= 0;
              return (
                <div
                  key={event.id}
                  className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isFull
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {isFull ? "Sold Out" : `${spotsLeft} spots left`}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary/70" />
                      <span>
                        {format(new Date(event.startDate), "MMM d, yyyy")}
                        {" - "}
                        {format(new Date(event.endDate), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary/70" />
                      <span>
                        {event.bookings.length} / {event.capacity} booked
                      </span>
                    </div>
                  </div>
                  <Button
                    className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    disabled={isFull}
                    onClick={() =>
                      navigate("event-detail", { eventId: event.id })
                    }
                  >
                    {isFull ? "Sold Out" : "View & Book"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
