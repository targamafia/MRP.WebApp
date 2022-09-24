import { NavLink } from "react-router-dom";
import { Card } from "../../shared/components/card";
import { Row } from "../../shared/components/row";

export const Onboarding = () => {
  return (
    <div className="max-w-md">
      <Card padding={8} rounded="lg" bg="surfaces-dark-1">
        <div className="text-white text-center">
          <div className="mb-16">
            <h1>MRP Administración</h1>
            <p>
              Te damos la bienvenida, por favor inicia sesión o crea una cuenta
              para continuar
            </p>
          </div>
          <Row spacing={8} justify="center">
            <NavLink to="/login">Iniciar Sesión</NavLink>
            <NavLink to="/signup">Crear una Cuenta</NavLink>
          </Row>
        </div>
      </Card>
    </div>
  );
};
