import { UserFocusPage } from './pages/userFocusPage';
import { AllUsers } from './pages/allUsers';
import { NewAssessment } from './pages/newUser';
import { UserDetail } from './components/userDetail/userDetail';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../navigation/404';

export default () => {
  return (
    <Routes>
      <Route path="" element={<AllUsers />}>
        <Route path=":id" element={<UserDetail />} />
      </Route>
      <Route path="new" element={<NewAssessment />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
