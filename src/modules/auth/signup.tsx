import { FormEvent, FormEventHandler, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/card';
import { Row } from '@/shared/layout/row';
import { useAuth } from '@/shared/providers/userProvider';

export const SignupCard = () => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputHandler = (mutator: Function) => {
    return (ev: FormEvent | any) => {
      mutator(ev.target.value! || '');
    };
  };

  const formSubmit: FormEventHandler = async (ev: FormEvent) => {
    ev.preventDefault();
    if (password != confirmPassword) return setError("Passwords don't match");
    const res = await signup(name, lastName, email, password, companyCode);
    if (!res.isSuccess) return setError(res.error);
    return navigate(import.meta.env.BASE_URL);
  };

  return (
    <div className="max-w-2xl w-full text-main">
      <Card padding={8} rounded="lg" bg="surface-1" color="main">
        <div className="mb-8">
          <h1>Crear una cuenta</h1>
          <p>
            Te damos la bienvenida, llena el formulario para crear tu cuenta
          </p>
        </div>
        <form
          onSubmit={formSubmit}
          className="text-left flex flex-col items-stretch gap-6 mb-16"
        >
          <Row spacing={8} items="start" justify="stretch">
            <div className="flex flex-col gap-4 flex-grow">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="block">
                  Correo:
                </label>
                <input
                  id="email"
                  type="email"
                  onInput={inputHandler(setEmail)}
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Contraseña:</label>
                <input
                  id="password"
                  type="password"
                  onInput={inputHandler(setPassword)}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                <input
                  id="confirmPassword"
                  type="password"
                  onInput={inputHandler(setConfirmPassword)}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="block">
                  Nombre:
                </label>
                <input
                  id="name"
                  type="text"
                  onInput={inputHandler(setName)}
                  autoComplete="given-name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="block">
                  Apellido:
                </label>
                <input
                  id="lastName"
                  type="text"
                  onInput={inputHandler(setLastName)}
                  autoComplete="family-name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Compañia:</label>
                <input
                  id="company"
                  type="text"
                  onInput={inputHandler(setCompanyCode)}
                  autoComplete="organization"
                />
              </div>
            </div>
          </Row>
          <input
            type="submit"
            value="Crear cuenta"
            className="px-8 py-2 bg-blue rounded-md cursor-pointer
            hover:bg-primary-40 mx-auto text-white"
          />
        </form>
        <div className="text-center">
          <p>Ya tienes una cuenta?</p>
          <Row spacing={8} justify="center">
            <NavLink to={import.meta.env.BASE_URL + 'auth/login'}>
              Inicia sesión
            </NavLink>
          </Row>
        </div>
      </Card>
    </div>
  );
};
