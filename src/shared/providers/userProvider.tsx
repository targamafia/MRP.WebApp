import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useBack } from "../hooks/useBack";
import { UserModel } from "../models/userModel";

const loginRoute = "/v1/users/login",
  signupRoute = "/v1/users/signup";

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
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : ({} as UserModel)
  );
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const { fetchData, error } = useBack();

  const login = async (email: string, password: string): Promise<any> => {
    const response = await fetchData(loginRoute, "post", {
      email,
      password,
    });
    if (!response.error) {
      setUser(response.user);
      setToken(response.token);
    }
    return response;
  };

  const signup = async (
    name: string,
    lastName: string,
    email: string,
    password: string,
    companyCode: string
  ): Promise<any> => {
    const response = await fetchData(signupRoute, "post", {
      name,
      lastName,
      email,
      password,
      companyCode,
    });
    if (!response?.isSuccess) return { error: error };
    setUser(response._value.user);
    setToken(response._value.token);
    return response._value;
  };

  const logout = async (): Promise<any> => {
    setToken(null!);
  };

  useEffect(() => {
    if (token === undefined || token === null) return;
    localStorage.setItem("jwt", token);
  }, [token]);
  useEffect(() => {
    if (user === undefined || user === null) return;
    localStorage.setItem("user", JSON.stringify(user));
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
