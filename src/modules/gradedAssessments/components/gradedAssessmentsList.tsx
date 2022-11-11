import { IGradeAssessment } from '../models/gradedAssessments.models';
import { GradedAssessmentCard } from './gradedAssessmentCard';

export const GradedAssessmentsList = (props: {
  gradedAssessments: IGradeAssessment[];
}) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      {props.gradedAssessments.length > 0 ? props.gradedAssessments.map((a) => (
        <GradedAssessmentCard gradedAssesment={a} key={a.id} />
      )) : <p>No Hay Exámenes</p>}
    </div>
  );
};
