import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useUserGradedAssessments } from '../hooks/gradedAssessmentHooks';
import { GradedAssessmentsList } from './gradedAssessmentsList';

export const UserGradedAssessments = (props: { userId: string }) => {
  if (!props.userId) return <ErrorMessage message="Invalid user id" />;

  let { gradedAssessments, error, loading } = useUserGradedAssessments(
    props.userId
  );

  return loading ? (
    <LoadingSpinner />
  ) : !!error ? (
    error.response?.status != 404 ? (
      <ErrorMessage message={error?.toString()} />
    ) : (
      <p>No ha contestado ningún examen</p>
    )
  ) : (
    <GradedAssessmentsList
      gradedAssessments={gradedAssessments.sort(
        (a, b) => new Date(b.endDate).valueOf() - new Date(a.endDate).valueOf()
      )}
    />
  );
};
