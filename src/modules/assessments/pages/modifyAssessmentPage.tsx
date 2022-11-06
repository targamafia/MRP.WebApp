import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { useParams } from 'react-router-dom';
import EditDetailsForm from '../components/assessmentDetail/editDetailsForm';
import { useAssessment } from '../hooks/useAssessments';
import { IAssessment } from '../models';

const ModifyAssessmentPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="No ID Found in route" />;
  const { assessment, error, loading } = useAssessment(id);
  
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <>
      <EditDetailsForm assessment={assessment as IAssessment} />
    </>
  );
};

export default ModifyAssessmentPage;
