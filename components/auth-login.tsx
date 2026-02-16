"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/lib/router";
import { useApp } from "@/lib/app-context";
import { ArrowLeft, LogIn } from "lucide-react";

export function AuthLogin() {
  const { navigate } = useRouter();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const success = login(email, password);
    if (success) {
      navigate("dashboard");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => navigate("landing")}
            className="font-heading text-xl font-bold tracking-tight text-foreground"
          >
            EventFlow
          </button>
          <Button
            variant="ghost"
            onClick={() => navigate("landing")}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <LogIn className="h-6 w-6 text-primary" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to manage your events
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <button
                onClick={() => navigate("register")}
                className="font-medium text-primary hover:underline"
              >
                Create one
              </button>
            </p>

            <div className="mt-4 rounded-lg bg-accent/50 p-3 text-center text-xs text-muted-foreground">
              <p className="font-medium text-foreground/80">Demo credentials</p>
              <p className="mt-1">
                {"alex@eventflow.io / password123"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
