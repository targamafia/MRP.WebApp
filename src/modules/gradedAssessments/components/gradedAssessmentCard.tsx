import { useAssessment } from '@/modules/assessments/hooks/useAssessments';
import { IGradeAssessment } from '@/modules/users/models';
import { Row } from '@/shared/layout/row';
import { NavLink } from 'react-router-dom';
import { Grade } from './grade';
import { GradeUserInfo } from './gradeUserInfo';

export const GradedAssessmentCard = (props: {
  gradedAssessment: IGradeAssessment;
}) => {
  const startDate = new Date(props.gradedAssessment.startDate),
    endDate = new Date(props.gradedAssessment.endDate),
    duration = endDate.valueOf() - startDate.valueOf(),
    minutos = duration / (60 * 1000);

  return (
    <div className='p-4 bg-surface-4 rounded-md shadow-md grid gap-4'>
      <GradeUserInfo applicant={props.gradedAssessment.applicant} />
      <NavLink
        to={`/history/${props.gradedAssessment.id}`}
        className="text-center"
      >
        <Row spacing={6}>
          <div className="text-left grow">
            <p className="text-xs">{startDate.toLocaleString()}</p>
            <h3 className="text-xl">
              {props.gradedAssessment.assessment?.title}
            </h3>
            <p className="mb-0 text-sm">
              <b>Tiempo Transcurrido:</b> {minutos.toFixed(0)} m
            </p>
          </div>
          <div className="text-right self-stretch flex justify-center flex-col">
            <Grade grade={props.gradedAssessment.grade} />
            <p className="mb-0">
              {props.gradedAssessment.correctAnswers} /{' '}
              {props.gradedAssessment.correctAnswers +
                props.gradedAssessment.wrongAnswers}
            </p>
          </div>
        </Row>
      </NavLink>
    </div>
  );
};
