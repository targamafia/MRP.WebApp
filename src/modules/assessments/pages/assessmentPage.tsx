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

export const AssessmentPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;

  const navigate = useNavigate();

  const { assessment, error, loading } = useAssessment(id);

  const { mutate: deleteAssessment } = useDeleteAssessment(() =>
    navigate(`${import.meta.env.BASE_URL}assessments`)
  );

  return (
    <MainContainer bgImg={assessment?.thumbnailUrl}>
      {loading ? (
        <LoadingSpinner />
      ) : !error ? (
        assessment !== undefined ? (
          <>
            <div className="my-2 mb-12">
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
function NavigationTab(props: { to: string; label: string }) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        [
          'px-4 py-2 hover:bg-primary-60',
          'rounded-md hover:scale-105 transition-transform',
          isActive
            ? '!bg-blue text-white hover:text-white'
            : 'text-main hover:text-main',
        ].join(' ')
      }
    >
      {props.label}
    </NavLink>
  );
}
