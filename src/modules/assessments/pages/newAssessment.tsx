import { AssessmentForm } from "@/modules/assessments/components/assessmentForm";
import { MainContainer } from "@/shared/layout/mainContainer";
import { Row } from "@/shared/layout/row";
import { ArrowBackIos } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export const NewAssessment = () => {
  return (
    <MainContainer>
      <Row spacing={2} items="center">
        <NavLink to="/" className="mb-8">
          <ArrowBackIos />
        </NavLink>
        <h1 className="mb-8 grow">Nuevo Quiz</h1>
      </Row>
      <AssessmentForm />
    </MainContainer>
  );
};