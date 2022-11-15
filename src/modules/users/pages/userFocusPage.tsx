import { ErrorMessage } from '@/shared/components/errorMessage';
import { MainContainer } from '@/shared/layout/mainContainer';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { NavLink, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUserHooks';
import { Title } from '@/shared/components/title';
import { UserDetail } from '../components/userDetail/userDetail';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';

export const UserFocusPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing user Id" />;
  const { user, error, loading } = useUser(id);

  return (
    <MainContainer>
      <HandleAsyncData loading={loading} error={error}>
        {() => (
          <>
            <div className="my-2 mb-4 sticky top-14 backdrop-blur-lg rounded-b-lg">
              <Title
                title={user.name + ' ' + user.lastName}
                back={true}
                cta={
                  <NavLink to="./edit">
                    <EditOutlined />
                  </NavLink>
                }
              />
            </div>
            <UserDetail />
          </>
        )}
      </HandleAsyncData>
    </MainContainer>
  );
};
