"use client";

import { CalendarDays, CheckCircle2, BarChart3, Users, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/router";

const features = [
  {
    icon: CalendarDays,
    title: "Create Events Instantly",
    description:
      "Set up your event in under a minute. Add title, dates, capacity, and you are live.",
  },
  {
    icon: Users,
    title: "Seamless Booking",
    description:
      "Attendees book tickets without creating an account. Zero friction, maximum attendance.",
  },
  {
    icon: BarChart3,
    title: "Track Everything",
    description:
      "Real-time dashboard showing bookings, capacity, and attendee details at a glance.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed. Your events load instantly and bookings happen in real time.",
  },
];

const stats = [
  { value: "10K+", label: "Events Created" },
  { value: "250K+", label: "Tickets Booked" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "Creator Rating" },
];

export function LandingPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
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
              onClick={() => navigate("events")}
              className="hidden text-foreground/80 hover:text-foreground sm:inline-flex"
            >
              Browse Events
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

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(199_89%_48%/0.08),transparent_60%)]" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Trusted by 10,000+ event creators
          </div>
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl text-balance">
            Tired of manually tracking your events?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            EventFlow makes event management effortless. Create events, share
            booking links, and watch your attendance grow — all from one
            beautiful dashboard.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={() => navigate("register")}
              className="bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              Start Creating Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("events")}
              className="border-border text-foreground hover:bg-accent"
            >
              Browse Events
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-card py-10 sm:py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              Everything you need to run successful events
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From creation to tracking, EventFlow handles the entire lifecycle
              of your events so you can focus on what matters.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border/60 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-8 sm:py-16">
          <h2 className="font-heading text-3xl font-bold md:text-4xl text-balance">
            Ready to streamline your events?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Join thousands of creators who trust EventFlow to manage their
            events. Free to get started, no credit card required.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("register")}
            className="mt-8 bg-card px-8 text-foreground hover:bg-card/90"
          >
            Create Your First Event
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-heading text-lg font-bold text-foreground">
            EventFlow
          </p>
          <p className="text-sm text-muted-foreground">
            Built for creators who care about their community.
          </p>
        </div>
      </footer>
    </div>
  );
}
