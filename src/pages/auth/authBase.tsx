import { Outlet } from 'react-router-dom';

export const AuthBase = () => {
  return (
    <div className="h-screen flex flex-row items-center justify-center p-16">
      <Outlet />
    </div>
  );
};
