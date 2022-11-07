import { Outlet } from 'react-router-dom';
import { Navbar } from '@/modules/navigation/navbar';

export const AppBase = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
