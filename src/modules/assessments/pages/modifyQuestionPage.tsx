import { ErrorMessage } from '@/shared/components/errorMessage';
import { useParams } from 'react-router-dom';
import { QuestionForm } from '../components/assessmentDetail/questionForm';
import { useUpdateAssessmentQuestion } from '../hooks/useAssessments';

const ModifyQuestionPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="No ID Found in route" />;

  return <QuestionForm questionHook={useUpdateAssessmentQuestion} />;
};

export default ModifyQuestionPage;
