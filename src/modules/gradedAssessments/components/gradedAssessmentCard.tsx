import { useAssessment } from '@/modules/assessments/hooks/useAssessments';
import { IGradeAssessment } from '@/modules/users/models';
import { Row } from '@/shared/layout/row';

export const GradedAssessmentCard = (props: {
  gradedAssesment: IGradeAssessment;
}) => {
  const startDate = new Date(props.gradedAssesment.startDate),
    endDate = new Date(props.gradedAssesment.endDate),
    duration = startDate.valueOf() - endDate.valueOf(),
    minutos = duration / (60 * 1000),
    grade = props.gradedAssesment.grade;

  return (
    <div className="p-4 bg-surface-4 rounded-md text-center">
      <p className="text-xs">{startDate.toLocaleString()}</p>
      <h3 className="text-xl">{props.gradedAssesment.assessment?.title}</h3>
      <div className="text-center p-4">
        <p
          className={[
            'mb-0 text-2xl font-black',
            grade <= 0.6
              ? 'text-red-600'
              : grade <= 0.8
              ? 'text-amber-400'
              : 'text-emerald-600',
          ].join(' ')}
        >
          {(grade * 100).toFixed(2)}%
        </p>
        <p className="mb-0">
          {props.gradedAssesment.correctAnswers} /{' '}
          {props.gradedAssesment.correctAnswers +
            props.gradedAssesment.wrongAnswers}
        </p>
      </div>
      <p className="mb-0 text-sm">{minutos} minutos transcurridos</p>
    </div>
  );
};
