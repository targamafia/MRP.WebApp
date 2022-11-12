import { useAssessment } from '@/modules/assessments/hooks/useAssessments';
import { IGradeAssessment } from '@/modules/users/models';
import { Row } from '@/shared/layout/row';

export const GradedAssessmentCard = (props: {
  gradedAssesment: IGradeAssessment;
}) => {
  const startDate = new Date(props.gradedAssesment.startDate),
    endDate = new Date(props.gradedAssesment.endDate),
    duration = endDate.valueOf() - startDate.valueOf(),
    minutos = duration / (60 * 1000),
    grade = props.gradedAssesment.grade;

  return (
    <div className="p-4 bg-surface-4 rounded-md text-center shadow-md">
      <Row spacing={6}>
        <div className="text-left grow">
          <p className="text-xs">{startDate.toLocaleString()}</p>
          <h3 className="text-xl">{props.gradedAssesment.assessment?.title}</h3>
          <p className="mb-0 text-sm">
            <b>Tiempo Transcurrido:</b> {minutos.toFixed(0)} m
          </p>
        </div>
        <div className="text-right self-stretch flex justify-center flex-col">
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
      </Row>
    </div>
  );
};
