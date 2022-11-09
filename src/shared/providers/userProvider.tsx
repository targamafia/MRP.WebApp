import React, { ReactNode, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useBack } from '@/shared/hooks/useBack';
import { UserModel } from '@/shared/models/userModel';
import { postFetch } from '../services/fetcher';
import { useLocation, useNavigate } from 'react-router-dom';

const loginRoute = '/v1/users/login',
  signupRoute = '/v1/users/signup';

interface IAuthContext {
  user: UserModel | null;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  signup: (
    name: string,
    lastName: string,
    email: string,
    password: string,
    companyCode: string
  ) => Promise<any>;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function UserProvider(props: { children: ReactNode }) {
  const [user, setUser] = useState(
    localStorage.getItem('user') !== undefined
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : ({} as UserModel)
  );
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  const { fetchData, error } = useBack();
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (email: string, password: string): Promise<any> => {
    const res = await postFetch(loginRoute, {
      email,
      password,
    });
    setUser(res.user);
    setToken(res.token);
    const origin = location.state?.from?.pathname || '/';
    navigate(origin);
    return res;
  };

  const signup = async (
    name: string,
    lastName: string,
    email: string,
    password: string,
    companyCode: string
  ): Promise<any> => {
    const res = await fetchData(signupRoute, 'post', {
      name,
      lastName,
      email,
      password,
      companyCode,
    });
    if (!res?.isSuccess) return { error: error };
    setUser(res.entity.user);
    setToken(res.entity.token);
    return res.entity;
  };

  const logout = async (): Promise<any> => {
    setToken(null!);
  };

  useEffect(() => {
    if (token === undefined || token === null) return;
    localStorage.setItem('jwt', token);
  }, [token]);

  useEffect(() => {
    if (user === undefined || user === null) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup }}>
      {props.children}
    </AuthContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  return useContext(AuthContext);
}
