"use client";

import { useState } from "react";
import { CalendarDays, Users, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/lib/router";
import { useApp } from "@/lib/app-context";
import { format } from "date-fns";

export function EventDetail() {
  const { params, navigate } = useRouter();
  const { events, bookEvent } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const event = events.find((e) => e.id === params.eventId);

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Event not found.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("events")}
          >
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const spotsLeft = event.capacity - event.bookings.length;
  const isFull = spotsLeft <= 0;

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || !email) {
      setError("Please fill in your name and email.");
      return;
    }
    const result = bookEvent(event!.id, name, email);
    if (result) {
      setSuccess(true);
      setName("");
      setEmail("");
    } else {
      setError(
        "Could not complete booking. You may have already booked or the event is full."
      );
    }
  }

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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("events")}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">All Events</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Event Info */}
          <div className="lg:col-span-3">
            <div
              className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                isFull
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {isFull ? "Sold Out" : `${spotsLeft} spots remaining`}
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {event.title}
            </h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {event.description}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(
                      new Date(event.startDate),
                      "EEEE, MMMM d, yyyy"
                    )}{" "}
                    -{" "}
                    {format(new Date(event.endDate), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.startDate), "h:mm a")} -{" "}
                    {format(new Date(event.endDate), "h:mm a")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Capacity
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.bookings.length} / {event.capacity} booked
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
              {success ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
                    Booking Confirmed!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {"You're all set. We look forward to seeing you there."}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSuccess(false)}
                  >
                    Book Another Ticket
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Book Your Spot
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    No account needed. Just enter your details.
                  </p>
                  <form
                    onSubmit={handleBook}
                    className="mt-6 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="bookName" className="text-foreground">
                        Full Name
                      </Label>
                      <Input
                        id="bookName"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background"
                        disabled={isFull}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="bookEmail" className="text-foreground">
                        Email
                      </Label>
                      <Input
                        id="bookEmail"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background"
                        disabled={isFull}
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={isFull}
                      className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isFull ? "Event is Full" : "Confirm Booking"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
