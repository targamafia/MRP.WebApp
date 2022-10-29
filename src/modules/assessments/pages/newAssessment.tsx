import { AssessmentForm } from "@/modules/assessments/components/assessmentDetail/assessmentForm";
import { MainContainer } from "@/shared/layout/mainContainer";
import { Row } from "@/shared/layout/row";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export const NewAssessment = () => {
  return (
    <MainContainer>
      <Row spacing={2} items="center" wrap={false}>
        <NavLink to="../" className="mb-8">
          <ArrowBackIos />
        </NavLink>
        <h1 className="mb-8 grow">Nuevo Quiz</h1>
      </Row>
      <AssessmentForm />
    </MainContainer>
  );
};
