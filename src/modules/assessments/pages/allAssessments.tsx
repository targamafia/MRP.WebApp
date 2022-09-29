import { AssessmentList } from "@/modules/assessments/components/assessmentList";
import { MainContainer } from "@/shared/layout/mainContainer";
import { Row } from "@/shared/layout/row";
import { ArrowBackIos } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export const AllAssessments = () => {
  return (
    <MainContainer>
      <Row spacing={2} items="center">
        <NavLink to="/" className="mb-8">
          <ArrowBackIos />
        </NavLink>
        <h1 className="mb-8 grow">Quizes</h1>
        <NavLink to="new" className="mb-8">
          <Button variant="contained">Crear nuevo Quiz</Button>
        </NavLink>
      </Row>
      <AssessmentList />
    </MainContainer>
  );
};
