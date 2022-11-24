import { MainContainer } from '@/shared/layout/mainContainer';
import { Outlet } from 'react-router-dom';

export const BaseDocsPage = () => {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
};
