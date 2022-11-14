import { ErrorMessage } from '@/shared/components/errorMessage';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { Message } from '@/shared/components/message';
import { Title } from '@/shared/components/title';
import { NavLink, useParams } from 'react-router-dom';
import { useAssessment } from '../../hooks/useAssessments';
import QuestionCard from './questionCard';

export const AssessmentQuestions = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;
  const { assessment, error, loading } = useAssessment(id);

  return (
    <HandleAsyncData loading={loading} error={error}>
      {() => (
        <div className="flex flex-col gap-8">
          <Title
            title="Preguntas"
            cta={
              <NavLink
                to="new"
                className="bg-blue px-4 py-2 rounded-md text-white"
              >
                Agregar Pregunta
              </NavLink>
            }
          />
          {assessment !== undefined ? (
            !!assessment.questions && assessment.questions?.length > 0 ? (
              assessment.questions.map((question, i) => (
                <QuestionCard
                  key={i}
                  question={question}
                  assessmentId={assessment._id || assessment.id}
                />
              ))
            ) : (
              <Message
                type="info"
                title="Oops, no hay preguntas"
                message="Agrega una pregunta"
              />
            )
          ) : (
            <Message
              type="error"
              title="Oops, no encontré ese quiz"
              message="Intenta con otro"
            />
          )}
        </div>
      )}
    </HandleAsyncData>
  );
};

export default AssessmentQuestions;
