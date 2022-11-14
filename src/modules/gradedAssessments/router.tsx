import { Route, Routes } from 'react-router-dom';
import { NotFound } from '@/modules/navigation/404';
import { lazy } from 'react';

const AllGradedAssessments = lazy(() => import('./pages/allGradedAssessments'));
const GradedAssessmentDetail = lazy(
  () => import('./pages/gradedAssessmentDetail')
);

export default () => {
  return (
    <Routes>
      <Route index element={<AllGradedAssessments />} />
      <Route path=":gradeId" element={<GradedAssessmentDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
