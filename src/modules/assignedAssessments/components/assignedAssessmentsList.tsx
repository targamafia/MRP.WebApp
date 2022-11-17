import { AssessmentCard } from '@/modules/assessments/components/assessmentList/assessmentCard';
import { IAssessment } from '@/modules/assessments/models';
import { useUserPremiumAssessments } from '@/modules/assignedAssessments/hooks/useAssignedAssessments';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { UnassignAssessmentButton } from './unassignAssessmentButton';

export const UserAssignedAssessmentsList = (props: { userId: string }) => {
  if (!props.userId) throw Error('No se encontró el id');

  const { premiumAssessments, error, loading } = useUserPremiumAssessments(
    props.userId
  );

  return (
    <HandleAsyncData loading={loading} error={error}>
      {() => (
        <div className="flex flex-col gap-8">
          {premiumAssessments !== undefined &&
            premiumAssessments.map((assessment: IAssessment) => (
              <div className="relative" key={assessment.id}>
                <AssessmentCard assessment={assessment} />
                <UnassignAssessmentButton
                  userId={props.userId}
                  assessmentId={assessment.id}
                />
              </div>
            ))}
        </div>
      )}
    </HandleAsyncData>
  );
};

export default UserAssignedAssessmentsList;
