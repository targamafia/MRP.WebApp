import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card } from "@/shared/components/card";
import { Row } from "@/shared/layout/row";
import { useAuth } from "@/shared/providers/userProvider";

export const LoginCard = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const inputHandler = (name: string) => {
    const mutator = name == "email" ? setEmail : setPassword;
    return (ev: FormEvent | any) => {
      setError("");
      mutator(ev.target.value! || "");
    };
  };

  const formSubmit: FormEventHandler = async (ev: FormEvent) => {
    ev.preventDefault();
    const res = await login(email, password);
    if (res.error) return setError(res.error);
    return navigate('/')
  };

  return (
    <div className="max-w-md">
      <Card padding={8} rounded="lg" bg="surfaces-dark-1">
        <div className="text-white">
          <div className="mb-8">
            <h1>Iniciar Sesión</h1>
            <p>Te damos la bienvenida, por favor inicia sesión</p>
          </div>
          {error !== "" && (
            <div className="bg-surfaces-dark-3 p-4 mb-4 rounded-md border border-solid border-error-50 text-error-60">{error}</div>
          )}
          <form
            onSubmit={formSubmit}
            className="text-left flex flex-col items-stretch gap-6 mb-16"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="block">
                  Correo:
                </label>
                <input
                  id="email"
                  type="email"
                  onInput={inputHandler("email")}
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Contraseña:</label>
                <input
                  id="password"
                  type="password"
                  onInput={inputHandler("password")}
                  autoComplete="password"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="px-8 py-2 bg-blue rounded-md cursor-pointer hover:bg-primary-40 mx-auto"
            />
          </form>
          <div className="text-center">
            <p>No tienes una cuenta?</p>
            <Row spacing={8} justify="center">
              <NavLink to="/signup">Créala ahora</NavLink>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};
