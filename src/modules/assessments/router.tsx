import { AssessmentPage } from './pages/assessmentPage';
import { AllAssessments } from './pages/allAssessments';
import { NewAssessment } from './pages/newAssessment';
import { AssessmentDetails } from './components/assessmentDetail/assessmentDetails';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Title } from '@/shared/components/title';
import { AssessmentQuestions } from './components/assessmentDetail/assessmentQuestions';
import { QuestionForm } from './components/assessmentDetail/questionForm';
import { NotFound } from '../navigation/404';

export default () => {
  return (
    <Routes>
      <Route path="" element={<AllAssessments />} />
      <Route path="new" element={<NewAssessment />} />
      <Route path=":id" element={<AssessmentPage />}>
        <Route index element={<AssessmentDetails />} />
        <Route path="details" element={<AssessmentDetails />} />
        <Route path="questions">
          <Route path="" element={<AssessmentQuestions />} />
          <Route path="new" element={<QuestionForm />} />
        </Route>
        <Route path="ratings" element={<Title title="Reseñas" />} />
        <Route path="*" element={<Navigate to="details" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
