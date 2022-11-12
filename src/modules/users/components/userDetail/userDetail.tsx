import { UserGradedAssessments } from '@/modules/gradedAssessments/components/userGradedAssessments';
import NavigationTab from '@/modules/navigation/navigationTab';
import { ChipRow } from '@/shared/components/chipRow';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Title } from '@/shared/components/title';
import { Row } from '@/shared/layout/row';
import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUserHooks';
import { resetUserPassword } from '../../services/userServices';
import UserStats from './userStats';

export const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sentResetPassword, setResetPassword] = useState(false);
  if (!id) return <ErrorMessage message="Missing assessment id" />;

  const { user, loading, error } = useUser(id);

  const resetPassword = () => {
    resetUserPassword(user.email);
    setResetPassword(true);
  };

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <div
        className="fixed left-0 top-0 w-screen h-screen overflow-hidden
      bg-surface-1 bg-opacity-20 backdrop-blur-sm"
        onClick={() => navigate('../')}
      />
      <div
        className="max-w-lg fixed right-0 top-0 h-screen bg-surface-5
      pb-16 z-10 overflow-y-auto animate-slide-left px-8"
      >
        <div className="sticky top-0 bg-surface-5 pt-16 px-4 -mx-4 bg-opacity-50 backdrop-blur-sm">
          <Title title={user.name + ' ' + user.lastName} back={true} />
        </div>
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-1 grow">
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>
          <Row spacing={4}>
            <div className="flex flex-col gap-1 grow">
              <h2>Company Code</h2>
              <p>{user.companyCode || 'Sin código'}</p>
            </div>
            <div className="flex flex-col gap-1 grow">
              <h2>Rol</h2>
              <ChipRow elements={user.roles} />
            </div>
          </Row>
        </div>
        <div className="flex flex-row gap-8 my-8">
          {!sentResetPassword ? (
            <div
              className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
              onClick={resetPassword}
            >
              Reiniciar Contraseña
            </div>
          ) : (
            <div className="px-8 py-2 bg-emerald-500 rounded-md text-white mx-auto">
              Email enviado
            </div>
          )}
        </div>
        <h2>Métricas</h2>
        <UserStats />
        <Row
          spacing={4}
          className="my-8 mx-auto"
          justify="center"
          grow={true}
          items="center"
        >
          <NavigationTab to="history" label="Historial" />
          <NavigationTab to="assigned" label="Asignados" />
        </Row>
        <Outlet />
      </div>
    </>
  );
};
