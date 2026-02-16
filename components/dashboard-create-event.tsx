"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-context";
import { useRouter } from "@/lib/router";

export function DashboardCreateEvent() {
  const { createEvent } = useApp();
  const { navigate } = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title || !description || !startDate || !endDate || !capacity) {
      setError("Please fill in all fields.");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setError("End date must be after start date.");
      return;
    }
    if (parseInt(capacity) < 1) {
      setError("Capacity must be at least 1.");
      return;
    }

    createEvent({
      title,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      capacity: parseInt(capacity),
    });

    navigate("dashboard-events");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Create Event
        </h1>
        <p className="mt-1 text-muted-foreground">
          Fill in the details to create a new event.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border/60 bg-card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" className="text-foreground">
                Event Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. React Summit 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-foreground">
                Description
              </Label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe your event..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startDate" className="text-foreground">
                  Start Date & Time
                </Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="endDate" className="text-foreground">
                  End Date & Time
                </Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="capacity" className="text-foreground">
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                min={1}
                placeholder="e.g. 100"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="bg-background"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Event
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("dashboard-events")}
                className="text-foreground"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
