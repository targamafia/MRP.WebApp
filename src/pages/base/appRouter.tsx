import { Route, Routes } from 'react-router-dom';
import { NotFound } from '@/modules/navigation/404';
import { AppBase } from './appBase';
import { lazy } from 'react';
import { AppLandingPage } from './appLanding';

const AssessmentRoutes = lazy(() => import('@/modules/assessments/router'));
const UserRoutes = lazy(() => import('@/modules/users/router'));

export default () => {
  return (
    <Routes>
      <Route path={import.meta.env.BASE_URL} element={<AppBase />}>
        <Route index element={<AppLandingPage />} />
        <Route path="assessments/*" element={<AssessmentRoutes />} />
        <Route path="users/*" element={<UserRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
