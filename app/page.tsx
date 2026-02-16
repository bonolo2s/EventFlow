"use client";

import { RouterProvider } from "@/lib/router";
import { AppShell } from "@/components/app-shell";

export default function Home() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
