import { IAssessment } from "../models";
import { AssessmentCard } from "./assessmentCard";

export const AssessmentList = (props: { assessments: IAssessment[] }) => {
  return (
    <div className="flex flex-col gap-8">
      {props.assessments !== undefined &&
        props.assessments.map((assessment: IAssessment) => (
          <AssessmentCard key={assessment.id} {...assessment} />
        ))}
    </div>
  );
};
