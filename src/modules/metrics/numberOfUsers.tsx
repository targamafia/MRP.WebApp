import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useUsers } from '../users/hooks/useUserHooks';

const NumberOfUsersMetric = () => {
  const { users, error, loading } = useUsers();
  return (
    <div className="p-8 bg-surface-4 text-center border border-orange rounded-md">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error.toString()} />
      ) : (
        <h2 className="text-3xl">{users.length}</h2>
      )}
      <p>Usuarios totales</p>
    </div>
  );
};

export default NumberOfUsersMetric;
