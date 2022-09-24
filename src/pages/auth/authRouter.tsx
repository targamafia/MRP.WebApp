import { createBrowserRouter } from "react-router-dom";
import { LoginCard } from "../../modules/auth/login";
import { Onboarding } from "../../modules/auth/onboarding";
import { SignupCard } from "../../modules/auth/signup";
import { NotFound } from "../../modules/navigation/404";
import { AuthBase } from "./authBase";

export const AuthRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AuthBase />,
      children: [
        { path: "", element: <Onboarding /> },
        { path: "login", element: <LoginCard /> },
        { path: "signup", element: <SignupCard /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
};
