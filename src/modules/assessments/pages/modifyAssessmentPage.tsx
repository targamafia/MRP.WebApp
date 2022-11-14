import { ErrorMessage } from '@/shared/components/errorMessage';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { useParams } from 'react-router-dom';
import EditDetailsForm from '../components/assessmentDetail/editDetailsForm';
import { useAssessment } from '../hooks/useAssessments';
import { IAssessment } from '../models';

const ModifyAssessmentPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="No ID Found in route" />;
  const { assessment, error, loading } = useAssessment(id);

  return (
    <HandleAsyncData loading={loading} error={error}>
      {() => <EditDetailsForm assessment={assessment as IAssessment} />}
    </HandleAsyncData>
  );
};

export default ModifyAssessmentPage;
