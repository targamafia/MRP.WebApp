import { useAssessments } from '../assessments/hooks/useAssessments';
import MetricCard from './components/metricCard';

const NumberOfQuizesMetric = () => {
  const { assessments, error, loading } = useAssessments();
  return (
    <MetricCard
      to="assessments"
      loading={loading}
      error={error}
      data={assessments && assessments.length}
      label="Quizes totales"
    />
  );
};

export default NumberOfQuizesMetric;
