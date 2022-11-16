import QuestionCard from '@/modules/assessments/components/assessmentDetail/questionCard';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { Title } from '@/shared/components/title';
import { MainContainer } from '@/shared/layout/mainContainer';
import { Row } from '@/shared/layout/row';
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Grade } from '../components/grade';
import { useGradedAssessment } from '../hooks/gradedAssessmentHooks';

export const GradedAssessmentDetail = () => {
  const { gradeId } = useParams();
  if (!gradeId)
    return <ErrorMessage message="No se encontró el id de esta calificación" />;
  const { gradedAssessment, error, loading } = useGradedAssessment(gradeId);

  let startDate: Date | undefined,
    endDate: Date | undefined,
    duration: number,
    minutos: number;
  if (!!gradedAssessment) {
    startDate = new Date(gradedAssessment.startDate);
    endDate = new Date(gradedAssessment.endDate);
    duration = endDate.valueOf() - startDate.valueOf();
    minutos = duration / (60 * 1000);
  }

  return (
    <HandleAsyncData error={error} loading={loading}>
      {() => (
        <MainContainer>
          <div className="flex flex-row flex-wrap items-center">
            <Title back={true} title={gradedAssessment.id} />
            <Grade
              grade={gradedAssessment.grade}
              className="text-4xl mx-auto mb-8"
            />
          </div>
          <Row spacing={8} justify="start" className="mb-8">
            <p>
              <b>Fecha de Inicio:</b> {startDate?.toLocaleString()}
            </p>
            <p>
              <b>Tiempo Transcurrido:</b> {minutos.toFixed(1)} m
            </p>
          </Row>
          <div className="grid gap-8">
            {gradedAssessment &&
              (gradedAssessment.answers.map((answer, i) => (
                <QuestionCard
                  key={i}
                  question={answer.question}
                  answer={answer.givenAnswer.optionId}
                  assessmentId={answer.givenAnswer.questionId}
                />
              )) as unknown as ReactElement)}
          </div>
        </MainContainer>
      )}
    </HandleAsyncData>
  );
};

export default GradedAssessmentDetail;
