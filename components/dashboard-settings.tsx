"use client";

import { Bell, Globe, Shield, Palette } from "lucide-react";

const settingGroups = [
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure email and push notifications for bookings and event updates.",
  },
  {
    icon: Globe,
    title: "Language & Region",
    description: "Set your preferred language, timezone, and date format.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Manage your password, two-factor authentication, and session settings.",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Customize your dashboard theme and display preferences.",
  },
];

export function DashboardSettings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account preferences.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-4">
          {settingGroups.map((group) => (
            <div
              key={group.title}
              className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <group.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  {group.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Settings functionality is available when connected to a backend API.
            This is a frontend demo.
          </p>
        </div>
      </div>
    </div>
  );
}
