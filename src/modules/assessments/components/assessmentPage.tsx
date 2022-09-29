import { NotFound } from "@/modules/navigation/404";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { MainContainer } from "@/shared/layout/mainContainer";
import { Row } from "@/shared/layout/row";
import { ArrowBackIos } from "@mui/icons-material";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAssessment } from "../hooks/useAssessments";

export const AssessmentPage = () => {
  const { id } = useParams();
  const { assessment, error, loading } = useAssessment(id || "");

  return (
    <MainContainer>
      {loading ? (
        <LoadingSpinner />
      ) : !error ? (
        <>
          <Row spacing={2} items="center">
            <NavLink to="/" className="mb-8">
              <ArrowBackIos />
            </NavLink>
            <h1 className="mb-8">{assessment}</h1>
          </Row>
        </>
      ) : (
        <NotFound />
      )}
    </MainContainer>
  );
};
