"use client";

import { useRouter } from "@/lib/router";
import { LandingPage } from "@/components/landing-page";
import { AuthLogin } from "@/components/auth-login";
import { AuthRegister } from "@/components/auth-register";
import { EventsBrowse } from "@/components/events-browse";
import { EventDetail } from "@/components/event-detail";
import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardHome } from "@/components/dashboard-home";
import { DashboardEvents } from "@/components/dashboard-events";
import { DashboardCreateEvent } from "@/components/dashboard-create-event";
import { DashboardProfile } from "@/components/dashboard-profile";
import { DashboardSettings } from "@/components/dashboard-settings";

export function AppShell() {
  const { route } = useRouter();

  switch (route) {
    case "landing":
      return <LandingPage />;
    case "events":
      return <EventsBrowse />;
    case "event-detail":
      return <EventDetail />;
    case "login":
      return <AuthLogin />;
    case "register":
      return <AuthRegister />;
    case "dashboard":
      return (
        <DashboardLayout>
          <DashboardHome />
        </DashboardLayout>
      );
    case "dashboard-events":
      return (
        <DashboardLayout>
          <DashboardEvents />
        </DashboardLayout>
      );
    case "dashboard-create":
      return (
        <DashboardLayout>
          <DashboardCreateEvent />
        </DashboardLayout>
      );
    case "dashboard-profile":
      return (
        <DashboardLayout>
          <DashboardProfile />
        </DashboardLayout>
      );
    case "dashboard-settings":
      return (
        <DashboardLayout>
          <DashboardSettings />
        </DashboardLayout>
      );
    default:
      return <LandingPage />;
  }
}
