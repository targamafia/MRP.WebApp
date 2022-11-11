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
    <Row spacing={2} wrap={true}>
      <div className="p-6 rounded-md">
        <h3 className="text-xl text-center">{stats.premiumAssessments}</h3>
        <p>Exámenes comprados</p>
      </div>
      <div className="p-6 rounded-md">
        <h3 className="text-xl text-center">{stats.takenAssessments}</h3>
        <p>Exámenes tomados</p>
      </div>
    </Row>
  );
}

export default UserStats;
