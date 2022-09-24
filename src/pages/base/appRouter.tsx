import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../../modules/navigation/404";
import { Title } from "../../shared/components/title";
import { AppBase } from "./appBase";

export const AppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppBase />,
      children: [
        { path: "", element: <Title title="root" /> },
        { path: "logout", element: <Title title="logout" /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
};
