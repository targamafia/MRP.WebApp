import { AssessmentSmallCard } from '@/modules/assessments/components/assessmentList/assessmentSmallCard';
import { useAssessments } from '@/modules/assessments/hooks/useAssessments';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { useState } from 'react';
import { useAssignUserToAssessment } from '../hooks/useAssignedAssessments';

export const AssignNewAssessmentForm = (props: {
  userId: string;
  assignedAssessments?: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, error, isLoading } = useAssignUserToAssessment(props.userId);
  const {
    assessments,
    error: premiumError,
    loading: premiumLoading,
  } = useAssessments();

  const premiumAssessments =
    assessments &&
    assessments.filter(
      (assessment) =>
        assessment.isPremium &&
        !props.assignedAssessments?.includes(assessment.id)
    );

  return !isOpen ? (
    <div
      className="bg-blue text-white px-4 py-2 cursor-pointer rounded-md justify-self-center text-center my-6"
      onClick={() => setIsOpen(true)}
    >
      Asignar un Examen
    </div>
  ) : (
    <HandleAsyncData
      error={error || premiumError}
      loading={isLoading || premiumLoading}
    >
      {() => (
        <div className="flex flex-col gap-4 mb-8">
          <p className="text-lg">
            Haz click en un examen para asignárselo al usuario
          </p>
          {premiumAssessments.length > 0 ? (
            premiumAssessments.map((assessment) => (
              <div
                className="cursor-pointer"
                onClick={() => mutate(assessment.id)}
                key={assessment.id}
              >
                <div className="pointer-events-none">
                  <>
                    {console.log(assessment)}
                    <AssessmentSmallCard assessment={assessment} />
                  </>
                </div>
              </div>
            ))
          ) : (
            <p>No hay exámenes que asignar</p>
          )}
        </div>
      )}
    </HandleAsyncData>
  );
};
