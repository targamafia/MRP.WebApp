import { ChipRow } from '@/shared/components/chipRow';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Title } from '@/shared/components/title';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUserHooks';
import UserStats from './userStats';

export const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment id" />;

  const { user, loading, error } = useUser(id);
  if (!user) return <ErrorMessage message="No user" />;

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
      px-8 py-16 z-10 overflow-y-auto animate-slide-left"
      >
        <Title title={user.name + ' ' + user.lastName} back={true} />
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-1 grow">
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>
          <div className="flex flex-col gap-1 grow">
            <h2>Company Code</h2>
            <p>{user.companyCode || 'Sin código'}</p>
          </div>
          <div className="flex flex-col gap-1 grow">
            <h2>Rol</h2>
            <ChipRow elements={user.roles} />
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div
            className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
          >
            Reiniciar Contraseña
          </div>
        </div>
        <h2 className="mt-12 mb-4">Historial</h2>
        <UserStats />
      </div>
    </>
  );
};
