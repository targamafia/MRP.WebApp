import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Row } from '@/shared/layout/row';
import { useParams } from 'react-router-dom';
import { useUserStats } from '../../hooks/useUserHooks';

function UserStats() {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment id" />;

  const { stats, loading, error } = useUserStats(id);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
      <div className="grow p-2">
        <h3 className="text-xl">{stats.premiumAssessments}</h3>
        <p className='text-sm'>Exámenes comprados</p>
      </div>
      <div className="grow p-2">
        <h3 className="text-xl">{stats.takenAssessments}</h3>
        <p className='text-sm'>Exámenes tomados</p>
      </div>
    </div>
  );
}

export default UserStats;
