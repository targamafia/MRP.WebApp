import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Message } from '@/shared/components/message';
import { Title } from '@/shared/components/title';
import { MainContainer } from '@/shared/layout/mainContainer';
import Button from '@mui/material/Button';
import { useMemo, useReducer } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserFilters } from '../components/userList/userFilters';
import { UserList } from '../components/userList/userList';
import { useUsers } from '../hooks/useUserHooks';

interface ReducerState {
  roles: string[];
  query: string;
}

interface ReducerAction {
  property: string;
  value: any;
}

const filterReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.property) {
    case 'roles':
      if (!state.roles.includes(action.value))
        return { ...state, roles: [action.value, ...state.roles] };
      return {
        ...state,
        roles: state.roles.filter((v) => v != action.value),
      };
    case 'query':
      return { ...state, query: action.value };
    default:
      console.error('Unkown action property');
      return { ...state };
  }
};

export const AllUsers = () => {
  const { users: baseUsers, loading, error } = useUsers();

  const [filters, dispatch] = useReducer(filterReducer, {
    roles: [],
    query: '',
  } as ReducerState);

  const users = useMemo(() => {
    if (!baseUsers) return [];
    const queryEnabled = filters.query != '',
      rolesEnabled = filters.roles.length > 0,
      queryRegex = new RegExp(filters.query, 'ig');
    return baseUsers.filter(
      (assessment) =>
        (!rolesEnabled ||
          assessment.roles.some((category) =>
            filters.roles.includes(category)
          )) &&
        (!queryEnabled ||
          [
            assessment.name,
            assessment.roles.join(' '),
            assessment.lastName,
          ].some((i) => i !== undefined && queryRegex.test(i)))
    );
  }, [baseUsers, filters.roles, filters.query]);

  return (
    <>
      <MainContainer>
        <Title
          cta={
            <NavLink to="new" className="block">
              <Button variant="contained">Crear nuevo Usuario</Button>
            </NavLink>
          }
          title="Usuarios"
        />
        <UserFilters users={baseUsers} state={filters} dispatch={dispatch} />
        <div className="my-8"></div>
        {loading ? (
          <LoadingSpinner />
        ) : !!error ? (
          <Message type="error" title="Error" message={error.toString()} />
        ) : (
          <UserList users={users} />
        )}
      </MainContainer>
      <Outlet />
    </>
  );
};
