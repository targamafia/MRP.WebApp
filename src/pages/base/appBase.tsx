import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/modules/navigation/navbar';
import { useAuth } from '@/shared/providers/userProvider';

export const AppBase = () => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={`${import.meta.env.BASE_URL}login`} replace state={{ from: location }} />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
