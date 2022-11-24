import { Route, Routes } from 'react-router-dom';
import { NotFound } from '@/modules/navigation/404';
import { lazy } from 'react';
import { AppLandingPage } from './appLanding';

const AssessmentRoutes = lazy(() => import('@/modules/assessments/router'));
const UserRoutes = lazy(() => import('@/modules/users/router'));
const GradesRoutes = lazy(() => import('@/modules/gradedAssessments/router'));
const DocsRoutes = lazy(() => import('@/modules/documentation/router'));
const AppBase = lazy(() => import('@/pages/base/appBase'));

export default () => {
  return (
    <Routes>
      <Route path="auth/*" element={<></>} />
      <Route path="" element={<AppBase />}>
        <Route index element={<AppLandingPage />} />
        <Route path="assessments/*" element={<AssessmentRoutes />} />
        <Route path="users/*" element={<UserRoutes />} />
        <Route path="history/*" element={<GradesRoutes />} />
        <Route path="docs/*" element={<DocsRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
