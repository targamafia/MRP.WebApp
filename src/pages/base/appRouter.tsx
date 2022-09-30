import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "@/modules/navigation/404";
import { Title } from "@/shared/components/title";
import { AppBase } from "./appBase";
import assessmentRoutes from "@/modules/assessments/router";
import { MainContainer } from "@/shared/layout/mainContainer";
import { FeaturedAssessments } from "@/modules/assessments/components/featuredAssessments";

export const AppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppBase />,
      children: [
        {
          path: "",
          element: (
            <MainContainer>
              <Title title="MRP" />
              <FeaturedAssessments />
            </MainContainer>
          ),
        },
        assessmentRoutes,
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
};
