import { useEffect } from "react";
import { Row } from "../../shared/components/row";
import { useAuth } from "../../shared/providers/userProvider";

export const Navbar = () => {
  const { token, logout } = useAuth();

  useEffect(() => {
    !token && logout !== undefined && logout();
  }, [token]);

  return (
    <div className="px-8 py-4 w-full bg-surfaces-dark-5">
      <Row grow={true} justify="between">
        <span className="text-xl font-bold">MRP</span>
        <span
          className="cursor-pointer py-1 px-4 bg-orange text-white rounded-full"
          onClick={logout}
        >
          Cerrar Sesión
        </span>
      </Row>
    </div>
  );
};
