import { useEffect } from "react";
import { Row } from "@/shared/layout/row";
import { useAuth } from "@/shared/providers/userProvider";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { LogoutOutlined } from "@mui/icons-material";

export const Navbar = () => {
  const { token, logout, user } = useAuth();

  useEffect(() => {
    !token && logout !== undefined && logout();
  }, [token]);

  return (
    <div className="px-8 py-2 w-full bg-surfaces-dark-5">
      <Row grow={true} justify="between" spacing={10} items="center">
        <NavLink to="/" className="text-white">
          <span className="text-xl font-bold">MRP</span>
        </NavLink>
        <nav className="grow text-right">
          <NavLink
            to="/assessments"
            className={({ isActive }) =>
              isActive ? "text-orange" : "text-white"
            }
          >
            Quizes
          </NavLink>
        </nav>
        <IconButton
          onClick={() => {
            if (confirm("¿Cerrar sesión?")) logout();
          }}
        >
          <LogoutOutlined htmlColor="white" />
        </IconButton>
      </Row>
    </div>
  );
};
