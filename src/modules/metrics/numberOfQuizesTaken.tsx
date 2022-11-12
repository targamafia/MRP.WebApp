import { useAssessments } from '../assessments/hooks/useAssessments';
import { useGradedAssessments } from '../gradedAssessments/hooks/gradedAssessmentHooks';
import MetricCard from './components/metricCard';

const NumberOfQuizesTakenMetric = () => {
  const { gradedAssessments, error, loading } = useGradedAssessments();
  return (
    <MetricCard
      to="history"
      loading={loading}
      error={error}
      data={gradedAssessments && gradedAssessments.length}
      label="Quizes totales tomados"
    />
  );
};

export default NumberOfQuizesTakenMetric;
