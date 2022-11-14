import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '@/modules/navigation/navbar';
import { useAuth } from '@/shared/providers/userProvider';
import { useEffect } from 'react';

export const AppBase = () => {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth/onboarding', {
        replace: true,
        state: { from: location },
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen w-full">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default AppBase;
