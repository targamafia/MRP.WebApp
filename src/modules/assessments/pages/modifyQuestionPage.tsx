import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useParams } from 'react-router-dom';
import { EditQuestionForm } from '../components/assessmentDetail/editQuestionForm';
import { useAssessmentQuestion } from '../hooks/useAssessments';

const ModifyQuestionPage = () => {
  const { id: assessmentId, questionId } = useParams();
  if (!assessmentId) return <ErrorMessage message="Missing assessment id" />;
  if (!questionId) return <ErrorMessage message="Missing question id" />;

  const { question, error, loading } = useAssessmentQuestion({
    assessmentId,
    questionId,
  });

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <EditQuestionForm question={question} assessmentId={assessmentId} />
  );
};

export default ModifyQuestionPage;
