import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { NavLink } from 'react-router-dom';
import { useAssessments } from '../assessments/hooks/useAssessments';

const NumberOfQuizesMetric = () => {
  const { assessments, error, loading } = useAssessments();
  return (
    <NavLink
      to="assessments"
      className="p-8 grow bg-surface-4 text-center border border-orange rounded-md
    hover:scale-105 transition-all hover:bg-surface-5"
    >
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error.toString()} />
      ) : (
        <h2 className="text-3xl">{assessments.length}</h2>
      )}
      <p>Quizes totales</p>
    </NavLink>
  );
};

export default NumberOfQuizesMetric;
