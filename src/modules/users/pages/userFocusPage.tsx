import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { MainContainer } from '@/shared/layout/mainContainer';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { NavLink, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUserHooks';
import { Title } from '@/shared/components/title';
import { UserDetail } from '../components/userDetail/userDetail';

export const UserFocusPage = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing user Id" />;
  const { user, error, loading } = useUser(id);

  return (
    <MainContainer>
      {loading ? (
        <LoadingSpinner />
      ) : !error ? (
        user !== undefined ? (
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
        ) : (
          <></>
        )
      ) : (
        <ErrorMessage message={error.toString()} />
      )}
    </MainContainer>
  );
};
