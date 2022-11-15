import { AllUsers } from './pages/allUsers';
import { NewAssessment } from './pages/newUser';
import { UserDetail } from './components/userDetail/userDetail';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from '../navigation/404';
import { UserHistory } from './components/userDetail/userHistory';
import UserAssignedAssessments from './components/userDetail/userPremiumAssessments';

export default () => {
  return (
    <Routes>
      <Route path="" element={<AllUsers />}>
        <Route path=":id" element={<UserDetail />}>
          <Route index element={<Navigate to="history" replace={true} />} />
          <Route path="history" element={<UserHistory />} />
          <Route path="assigned" element={<UserAssignedAssessments />} />
        </Route>
      </Route>
      <Route path="new" element={<NewAssessment />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
