"use client";

import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/router";
import { useApp } from "@/lib/app-context";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DashRoute =
  | "dashboard"
  | "dashboard-events"
  | "dashboard-create"
  | "dashboard-settings"
  | "dashboard-profile";

const navItems: { label: string; icon: typeof LayoutDashboard; route: DashRoute }[] = [
  { label: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
  { label: "My Events", icon: CalendarDays, route: "dashboard-events" },
  { label: "Create Event", icon: PlusCircle, route: "dashboard-create" },
  { label: "Profile", icon: User, route: "dashboard-profile" },
  { label: "Settings", icon: Settings, route: "dashboard-settings" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { route, navigate } = useRouter();
  const { currentUser, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) {
    navigate("login");
    return null;
  }

  function handleLogout() {
    logout();
    navigate("landing");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-5">
          <button
            onClick={() => navigate("landing")}
            className="font-heading text-xl font-bold tracking-tight text-sidebar-foreground"
          >
            EventFlow
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = route === item.route;
            return (
              <button
                key={item.route}
                onClick={() => {
                  navigate(item.route);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {currentUser.fullName}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/50">
                {currentUser.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border/60 bg-card/80 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </button>
          <div className="flex-1" />
          <p className="hidden text-sm text-muted-foreground sm:block">
            Welcome back, <span className="font-medium text-foreground">{currentUser.fullName}</span>
          </p>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
