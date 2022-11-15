import { UserGradedAssessments } from '@/modules/gradedAssessments/components/userGradedAssessments';
import { useParams } from 'react-router-dom';

export const UserHistory = () => {
  const { id } = useParams();
  if (!id) throw Error('No se encontró el id');
  return <UserGradedAssessments userId={id} />;
};

export default UserHistory;
