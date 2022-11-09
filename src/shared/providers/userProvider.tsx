import React, { ReactNode, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UserModel } from '@/shared/models/userModel';
import { postFetch } from '../services/fetcher';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser } from '@/modules/users/models';

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
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem('user') || '{}') as IUser
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('jwt')
  );
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
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('jwt', res.token);
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
    const res = await postFetch(signupRoute, {
      name,
      lastName,
      email,
      password,
      companyCode,
    });
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem('user', res.user);
    localStorage.setItem('jwt', res.token);
    const origin = location.state?.from?.pathname || '/';
    navigate(origin);
    return res.entity;
  };

  const logout = async (): Promise<any> => {
    setToken(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

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
