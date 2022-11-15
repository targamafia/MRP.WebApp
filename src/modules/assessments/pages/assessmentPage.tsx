import { ErrorMessage } from '@/shared/components/errorMessage';
import { MainContainer } from '@/shared/layout/mainContainer';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAssessment, useDeleteAssessment } from '../hooks/useAssessments';
import { Title } from '@/shared/components/title';
import { Row } from '@/shared/layout/row';
import { IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import NavigationTab from '@/modules/navigation/navigationTab';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import LockOutlined from '@mui/icons-material/LockOutlined';
import StarOutlined from '@mui/icons-material/StarOutlined';

export const AssessmentPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;

  const navigate = useNavigate();

  const { assessment, error, loading } = useAssessment(id);

  const { mutate: deleteAssessment } = useDeleteAssessment(() =>
    navigate('/assessments')
  );

  return (
    <HandleAsyncData loading={loading} error={error}>
      {() => (
        <>
          <div className="sticky top-0 pt-12 px-7">
            <div className="flex flex-row gap-4">
              {assessment!.isPrivate && (
                <div className="mb-2">
                  <LockOutlined className="mb-1" /> Privado
                </div>
              )}
              {assessment!.isPremium && (
                <div className="text-amber-400 mb-2">
                  <StarOutlined className="mb-1" /> Premium
                </div>
              )}
            </div>
            <div
              className="absolute -z-10 w-full h-full top-0 left-0 opacity-20 bg-cover bg-center"
              style={{
                backgroundImage: `url("${
                  assessment?.thumbnailUrl ||
                  `${import.meta.env.BASE_URL}placeholder.png`
                }")`,
              }}
            ></div>
            <Title
              title={assessment!.title}
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
                    onClick={() => {
                      if (
                        !confirm(
                          `Estás a punto de borrar ${assessment?.title}, ¿quieres continuar?`
                        )
                      )
                        return;
                      deleteAssessment(id);
                    }}
                    className="hover:!text-error-50 hover:scale-110 transition-all"
                  >
                    <DeleteOutline />
                  </IconButton>
                </>
              }
            />
          </div>
          <MainContainer>
            <Row spacing={4} className="mb-8" items="center">
              <NavigationTab to="details" label="Detalles" />
              <NavigationTab to="questions" label="Preguntas" />
              <NavigationTab to="history" label="Historial" />
            </Row>
            <Outlet />
          </MainContainer>
        </>
      )}
    </HandleAsyncData>
  );
};
