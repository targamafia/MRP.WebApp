import { FeaturedAssessments } from '@/modules/assessments/components/assessmentList/featuredAssessments';
import NumberOfQuizesMetric from '@/modules/metrics/numberOfQuizes';
import NumberOfQuizesTakenMetric from '@/modules/metrics/numberOfQuizesTaken';
import NumberOfUsersMetric from '@/modules/metrics/numberOfUsers';
import { Title } from '@/shared/components/title';
import { MainContainer } from '@/shared/layout/mainContainer';

export const AppLandingPage = () => {
  return (
    <MainContainer>
      <Title title={import.meta.env.VITE_COMPANY_NAME} />
      <h2>Exámenes Populares</h2>
      <FeaturedAssessments />
      <div className="my-16"></div>
      <h2>Métricas generales</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <NumberOfUsersMetric />
        <NumberOfQuizesMetric />
        <NumberOfQuizesTakenMetric />
      </div>
    </MainContainer>
  );
};
