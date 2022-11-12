import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { MainContainer } from '@/shared/layout/mainContainer';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAssessment, useDeleteAssessment } from '../hooks/useAssessments';
import { Title } from '@/shared/components/title';
import { Row } from '@/shared/layout/row';
import { IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import NavigationTab from '@/modules/navigation/navigationTab';

export const AssessmentPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;

  const navigate = useNavigate();

  const { assessment, error, loading } = useAssessment(id);

  const { mutate: deleteAssessment } = useDeleteAssessment(() =>
    navigate('/assessments')
  );

  return (
    <MainContainer>
      {loading ? (
        <LoadingSpinner />
      ) : !error ? (
        assessment !== undefined ? (
          <>
            <div className="-mt-7 -mx-7 sticky top-0 py-12 px-7">
              <div
                className="absolute -z-10 w-full h-32 top-0 left-0 opacity-20 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${assessment?.thumbnailUrl}")`,
                }}
              ></div>
              <Title
                title={assessment.title}
                back={true}
                cta={
                  <>
                    <NavLink
                      to="./edit"
                      className="hover:text-orange hover:scale-110 transition-all"
                    >
                      <EditOutlined />
                    </NavLink>
                    <IconButton
                      onClick={() => deleteAssessment('')}
                      className="hover:!text-error-50 hover:scale-110 transition-all"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </>
                }
              />
            </div>
            <Row spacing={4} className="mb-8" items="center">
              <NavigationTab to="details" label="Detalles" />
              <NavigationTab to="questions" label="Preguntas" />
              <NavigationTab to="ratings" label="Reseña" />
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
