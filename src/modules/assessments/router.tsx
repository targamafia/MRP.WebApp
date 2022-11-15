import { AssessmentPage } from './pages/assessmentPage';
import { AllAssessments } from './pages/allAssessments';
import { NewAssessment } from './pages/newAssessment';
import { AssessmentDetails } from './components/assessmentDetail/assessmentDetails';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AssessmentQuestions } from './components/assessmentDetail/assessmentQuestions';
import { AssessmentGrades } from './components/assessmentDetail/assessmentGrades';
import { QuestionForm } from './components/assessmentDetail/questionForm';
import { NotFound } from '../navigation/404';
import ModifyAssessmentPage from './pages/modifyAssessmentPage';
import ModifyQuestionPage from './pages/modifyQuestionPage';

export default () => {
  return (
    <Routes>
      <Route index element={<AllAssessments />} />
      <Route path="new" element={<NewAssessment />} />
      <Route path=":id" element={<AssessmentPage />}>
        <Route index element={<Navigate to="details" replace={true}/>} />
        <Route path="details" element={<AssessmentDetails />} />
        <Route path="questions">
          <Route path="" element={<AssessmentQuestions />} />
          <Route path="new" element={<QuestionForm />} />
          <Route path=":questionId" element={<ModifyQuestionPage />} />
        </Route>
        <Route path="history" element={<AssessmentGrades />} />
        <Route path="edit" element={<ModifyAssessmentPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
