import { FeaturedAssessments } from '@/modules/assessments/components/assessmentList/featuredAssessments';
import { Title } from '@/shared/components/title';
import { MainContainer } from '@/shared/layout/mainContainer';

export const AppLandingPage = () => {
  return (
    <MainContainer>
      <Title title={import.meta.env.VITE_COMPANY_NAME} />
      <h2>Quizes Populares</h2>
      <FeaturedAssessments />
    </MainContainer>
  );
};
