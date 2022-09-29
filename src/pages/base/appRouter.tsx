import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "@/modules/navigation/404";
import { Title } from "@/shared/components/title";
import { AppBase } from "./appBase";
import assessmentRoutes from "@/modules/assessments/router";

export const AppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppBase />,
      children: [
        assessmentRoutes,
        { path: "logout", element: <Title title="logout" /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
};
