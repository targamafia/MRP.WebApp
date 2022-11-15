import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { NavLink } from 'react-router-dom';
import { useUsers } from '../users/hooks/useUserHooks';
import MetricCard from './components/metricCard';

const NumberOfUsersMetric = () => {
  const { users, error, loading } = useUsers();
  return (
    <MetricCard
      to="users"
      loading={loading}
      error={error}
      data={users !== undefined && users.length}
      label="Usuarios Totales"
    />
  );
};

export default NumberOfUsersMetric;
