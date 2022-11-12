import { AssessmentList } from '@/modules/assessments/components/assessmentList/assessmentList';
import { useUserPremiumAssessments } from '@/modules/assessments/hooks/useAssessments';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useParams } from 'react-router-dom';

export const UserAssignedAssessments = () => {
  const { id } = useParams();
  if (!id) throw Error('No se encontró el id');

  const { premiumAssessments, error, loading } = useUserPremiumAssessments(id);

  return loading ? (
    <LoadingSpinner />
  ) : !!error ? (
    error.response?.status === 404 ? (
      <p>No se encontraron exámenes</p>
    ) : (
      <ErrorMessage message={error.toString()} />
    )
  ) : (
    <>
      <h2 className="mt-12 mb-4">Historial</h2>
      {!!premiumAssessments ? (
        <AssessmentList assessments={premiumAssessments} />
      ) : (
        <p>No se encontraron exámenes.</p>
      )}
    </>
  );
};

export default UserAssignedAssessments;
