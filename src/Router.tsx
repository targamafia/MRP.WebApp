import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthRouter } from "@/pages/auth/authRouter";
import { AppRouter } from "@/pages/base/appRouter";
import { useAuth } from "@/shared/providers/userProvider";
import { LoadingSpinner } from "./shared/components/loadingSpinner";

export function GlobalRouter() {
  const { token } = useAuth();
  const [router, setRouter] = useState(token ? AppRouter() : AuthRouter());


  useEffect(() => {
    if (!token) return setRouter(AuthRouter());
    return setRouter(AppRouter());
  }, [token]);

  return <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />;
}
