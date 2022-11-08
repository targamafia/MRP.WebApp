import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { NavLink } from 'react-router-dom';
import { useUsers } from '../users/hooks/useUserHooks';

const NumberOfUsersMetric = () => {
  const { users, error, loading } = useUsers();
  return (
    <NavLink
      to="users"
      className="p-8 grow bg-surface-4 text-center border border-orange rounded-md
      hover:scale-105 transition-all hover:bg-surface-5"
    >
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error.toString()} />
      ) : (
        <h2 className="text-3xl">{users.length}</h2>
      )}
      <p>Usuarios totales</p>
    </NavLink>
  );
};

export default NumberOfUsersMetric;