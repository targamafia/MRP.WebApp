import { AssessmentList } from '@/modules/assessments/components/assessmentList/assessmentList';
import { useUserPremiumAssessments } from '@/modules/assessments/hooks/useAssessments';
import { AssignNewAssessmentForm } from '@/modules/assignedAssessments/components/assignNewAssessmentForm';
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
          (assessment) => assessment._id || assessment.id
        )}
      />
      <hr className="my-6 border-t-orange border-t-2" />
      <h3 className='mb-4'>Asignados</h3>
      {!!error ? (
        error.response?.status === 404 ? (
          <p>No se encontraron exámenes</p>
        ) : (
          <ErrorMessage message={error.toString()} />
        )
      ) : (
        <AssessmentList assessments={premiumAssessments} />
      )}
    </>
  );
};

export default UserAssignedAssessments;
