import { Toaster } from "./components/ui/sonner";
import { StrictMode, useEffect } from "react";
import "../styles/globals.css";
import { findPage } from "./pages";
import { authClient } from "./lib/auth-client";

export function App({
  children,
}: { router?: any; children?: React.ReactNode } = {}) {
  const session = authClient.useSession();

  useEffect(() => {
    const { pathname } = window.location;

    if (findPage(pathname)?.requiresAuth === false) {
      if (session.data?.user) {
        window.location.href = "/";
      }
    } else if (!session.data?.user && !session.isPending) {
      window.location.href = "/login";
    }
  }, [session.data?.user, session.isPending]);

  return (
    <StrictMode>
      <div className="size-full">
        {children}
        <Toaster />
      </div>
    </StrictMode>
  );
}
