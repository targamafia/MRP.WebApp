import { useAuth } from '@/shared/providers/userProvider';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const AuthBase = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate(import.meta.env.BASE_URL, { replace: true });
  }, []);

  return (
    <div className="h-screen flex flex-row items-center justify-center p-16">
      <Outlet />
    </div>
  );
};
