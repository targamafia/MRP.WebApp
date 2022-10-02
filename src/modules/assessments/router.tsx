import { AssessmentPage } from "./pages/assessmentPage";
import { AllAssessments } from "./pages/allAssessments";
import { NewAssessment } from "./pages/newAssessment";
import { AssessmentDetails } from "./components/assessmentDetails";
import { Navigate } from "react-router-dom";
import { Title } from "@/shared/components/title";
import { AssessmentQuestions } from "./components/assessmentQuestions";
import { QuestionForm } from "./components/questionForm";

export default {
  path: "assessments",
  children: [
    { path: "", element: <AllAssessments /> },
    { path: "new", element: <NewAssessment /> },
    {
      path: ":id",
      element: <AssessmentPage />,
      children: [
        { path: "details", element: <AssessmentDetails /> },
        {
          path: "questions",
          children: [
            { path: "", element: <AssessmentQuestions /> },
            { path: "new", element: <QuestionForm /> },
          ],
        },
        { path: "ratings", element: <Title title="Reseñas" /> },
        { path: "", element: <Navigate to="./details" replace={true} /> },
      ],
    },
  ],
};
