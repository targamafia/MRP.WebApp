import { MainContainer } from '@/shared/layout/mainContainer';
import { Row } from '@/shared/layout/row';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { NavLink } from 'react-router-dom';
import { NewUserForm } from '../components/userDetail/newUserForm';

export const NewAssessment = () => {
  return (
    <MainContainer>
      <Row spacing={2} items="center" wrap={false}>
        <NavLink to="../" className="mb-8">
          <ArrowBackIos />
        </NavLink>
        <h1 className="mb-8 grow">Nuevo Usuario</h1>
      </Row>
      <NewUserForm />
    </MainContainer>
  );
};
