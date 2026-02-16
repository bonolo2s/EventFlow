"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Route =
  | "landing"
  | "events"
  | "event-detail"
  | "login"
  | "register"
  | "dashboard"
  | "dashboard-events"
  | "dashboard-create"
  | "dashboard-settings"
  | "dashboard-profile";

interface RouterContextType {
  route: Route;
  params: Record<string, string>;
  navigate: (route: Route, params?: Record<string, string>) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<Route>("landing");
  const [params, setParams] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<{ route: Route; params: Record<string, string> }[]>([]);

  const navigate = useCallback(
    (newRoute: Route, newParams: Record<string, string> = {}) => {
      setHistory((prev) => [...prev, { route, params }]);
      setRoute(newRoute);
      setParams(newParams);
      window.scrollTo(0, 0);
    },
    [route, params]
  );

  const goBack = useCallback(() => {
    setHistory((prev) => {
      const next = [...prev];
      const last = next.pop();
      if (last) {
        setRoute(last.route);
        setParams(last.params);
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ route, params, navigate, goBack }),
    [route, params, navigate, goBack]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}
