import MetricCard from '@/modules/metrics/components/metricCard';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Row } from '@/shared/layout/row';
import { useParams } from 'react-router-dom';
import { useUserStats } from '../../hooks/useUserHooks';

function UserStats() {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment id" />;

  const { stats, loading, error } = useUserStats(id);

  return (
    <HandleAsyncData loading={loading} error={error}>
      {() => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <MetricCard
            to="history"
            data={stats.takenAssessments}
            label="Exámenes finalizados"
            loading={loading}
            error={error}
          />
          <MetricCard
            to="assigned"
            data={stats.premiumAssessments}
            label="Exámenes asignados"
            loading={loading}
            error={error}
          />
        </div>
      )}
    </HandleAsyncData>
  );
}

export default UserStats;
