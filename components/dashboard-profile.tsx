"use client";

import { User, Mail, Shield } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function DashboardProfile() {
  const { currentUser } = useApp();

  if (!currentUser) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your account information.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border border-border/60 bg-card p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                {currentUser.fullName}
              </h2>
              <p className="text-sm text-muted-foreground">Event Creator</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-4">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="text-sm font-medium text-foreground">
                  {currentUser.fullName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-4">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-4">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="text-sm font-medium capitalize text-foreground">
                  {currentUser.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
