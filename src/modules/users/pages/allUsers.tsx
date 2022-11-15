import { HandleAsyncData } from '@/shared/components/handleAsyncData';
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
      (user) =>
        (!rolesEnabled ||
          user.roles.some((category) => filters.roles.includes(category))) &&
        (!queryEnabled ||
          [
            [user.name, user.lastName].join(' '),
            user.roles.join(' '),
            user.companyCode,
          ].some((i) => i !== undefined && queryRegex.test(i)))
    );
  }, [baseUsers, filters.roles, filters.query]);

  return (
    <>
      <MainContainer>
        <div className="px-8 py-4 bg-surface-5 mb-12 rounded-lg shadow-inner">
          <Title title="Usuarios" />
          <div className="-mt-8" />
          <UserFilters users={baseUsers} state={filters} dispatch={dispatch} />
        </div>
        <HandleAsyncData loading={loading} error={error}>
          {() => <UserList users={users} />}
        </HandleAsyncData>
      </MainContainer>
      <Outlet />
    </>
  );
};
