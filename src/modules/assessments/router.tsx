import { AssessmentPage } from "./components/assessmentPage";
import { AllAssessments } from "./pages/allAssessments";
import { NewAssessment } from "./pages/newAssessment";


export default {
  path: "assessments",
  children: [
    { path: "", element: <AllAssessments /> },
    { path: "new", element: <NewAssessment /> },
    { path: ":id", element: <AssessmentPage /> },
  ],
};
