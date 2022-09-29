import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { useAssessments } from "../hooks/useAssessments";
import { IAssessment } from "../models";
import { AssessmentCard } from "./assessmentCard";

export const AssessmentList = () => {
  const { assessments, loading, error } = useAssessments();

  return (
    <div className="flex flex-col gap-4">
      {!loading &&
        !error &&
        assessments !== undefined &&
        assessments.map((assessment: IAssessment) => (
          <AssessmentCard key={assessment.id} {...assessment} />
        ))}
      {loading && <LoadingSpinner />}
      {error && <div>RIP</div>}
    </div>
  );
};
