import { ErrorMessage } from "@/shared/components/errorMessage";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { MainContainer } from "@/shared/layout/mainContainer";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useAssessment } from "../hooks/useAssessments";
import { Title } from "@/shared/components/title";
import { Row } from "@/shared/layout/row";

export const AssessmentPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;
  const { assessment, error, loading } = useAssessment(id);

  return (
    <MainContainer bgImg={assessment?.thumbnailUrl}>
      {loading ? (
        <LoadingSpinner />
      ) : !error ? (
        assessment !== undefined ? (
          <>
            <div className="my-2 mb-4 sticky top-14 backdrop-blur-lg rounded-b-lg">
              <Title
                title={assessment.title}
                back={true}
                cta={
                  <NavLink to="./edit">
                    <EditOutlined />
                  </NavLink>
                }
              />
            </div>
            <Row spacing={4} className="mb-8" items="center">
              <NavLink
                to="./details"
                className={({ isActive }) =>
                  (isActive
                    ? "bg-blue text-white rounded-md hover:text-white"
                    : "text-main hover:text-main") + " px-4 py-2"
                }
              >
                Detalles
              </NavLink>
              <NavLink
                to="./questions"
                className={({ isActive }) =>
                  (isActive
                    ? "bg-blue text-white rounded-md hover:text-white"
                    : "text-main hover:text-main") + " px-4 py-2"
                }
              >
                Preguntas
              </NavLink>
              <NavLink
                to="./ratings"
                className={({ isActive }) =>
                  (isActive
                    ? "bg-blue text-white rounded-md hover:text-white"
                    : "text-main hover:text-main") + " px-4 py-2"
                }
              >
                Reseñas
              </NavLink>
            </Row>
            <Outlet />
          </>
        ) : (
          <></>
        )
      ) : (
        <ErrorMessage message={error.toString()} />
      )}
    </MainContainer>
  );
};
