import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { Title } from '@/shared/components/title';
import { MainContainer } from '@/shared/layout/mainContainer';
import { GradedAssessmentsList } from '../components/gradedAssessmentsList';
import { useGradedAssessments } from '../hooks/gradedAssessmentHooks';

export const AllGradedAssessments = () => {
  const { gradedAssessments, error, loading } = useGradedAssessments();

  return (
    <HandleAsyncData error={error} loading={loading}>
      {() => (
        <MainContainer>
          <Title title="Historial de Calificaciones" />
          <GradedAssessmentsList
            gradedAssessments={gradedAssessments.sort(
              (a, b) =>
                new Date(b.endDate).valueOf() - new Date(a.endDate).valueOf()
            )}
          />
        </MainContainer>
      )}
    </HandleAsyncData>
  );
};

export default AllGradedAssessments;
