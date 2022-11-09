import { Route, Routes } from 'react-router-dom';
import { LoginCard } from '@/modules/auth/login';
import { Onboarding } from '@/modules/auth/onboarding';
import { SignupCard } from '@/modules/auth/signup';
import { NotFound } from '@/modules/navigation/404';
import { AuthBase } from './authBase';

export default () => {
  return (
    <Routes>
      <Route path={import.meta.env.BASE_URL} element={<AuthBase />}>
        <Route index element={<Onboarding />} />
        <Route path="login" element={<LoginCard />} />
        <Route path="signup" element={<SignupCard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
