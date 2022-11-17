import { AssessmentList } from '@/modules/assessments/components/assessmentList/assessmentList';
import UserAssignedAssessmentsList from '@/modules/assignedAssessments/components/assignedAssessmentsList';
import { AssignNewAssessmentForm } from '@/modules/assignedAssessments/components/assignNewAssessmentForm';
import { useUserPremiumAssessments } from '@/modules/assignedAssessments/hooks/useAssignedAssessments';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useParams } from 'react-router-dom';

export const UserAssignedAssessments = () => {
  const { id } = useParams();
  if (!id) throw Error('No se encontró el id');

  const { premiumAssessments, error, loading } = useUserPremiumAssessments(id);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h2 className="mt-12 mb-4">Exámenes Premium</h2>
      <AssignNewAssessmentForm
        userId={id}
        assignedAssessments={premiumAssessments?.map(
          (assessment) => assessment.id
        )}
      />
      <hr className="my-6 border-t-orange border-t-2" />
      <h3 className="mb-4">Asignados</h3>
      {!!error ? (
        error.response?.status === 404 ? (
          <p>No se encontraron exámenes</p>
        ) : (
          <ErrorMessage message={error.toString()} />
        )
      ) : (
        <UserAssignedAssessmentsList userId={id} />
      )}
    </>
  );
};

export default UserAssignedAssessments;
