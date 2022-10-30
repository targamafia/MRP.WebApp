import { useEffect } from 'react';
import { Row } from '@/shared/layout/row';
import { useAuth } from '@/shared/providers/userProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';

export const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !token && logout !== undefined && logout();
    navigate(import.meta.env.BASE_URL);
  }, [token]);

  return (
    <div className="px-8 py-2 w-full bg-surface-5 sticky top-0 bg-opacity-70 backdrop-blur-md z-10">
      <Row grow={true} justify="between" spacing={10} items="center">
        <NavLink to={import.meta.env.BASE_URL} className="text-main">
          <h2 className="mb-0">{import.meta.env.VITE_COMPANY_NAME}</h2>
        </NavLink>
        <nav className="grow flex flex-row gap-8">
          <NavLink
            to={import.meta.env.BASE_URL + 'assessments'}
            className={({ isActive }) =>
              isActive ? 'text-orange' : 'text-main'
            }
          >
            Quizes
          </NavLink>
          <NavLink
            to={import.meta.env.BASE_URL + 'users'}
            className={({ isActive }) =>
              isActive ? 'text-orange' : 'text-main'
            }
          >
            Users
          </NavLink>
        </nav>
        <IconButton
          onClick={() => {
            if (confirm('¿Cerrar sesión?')) logout();
          }}
          className="text-main"
        >
          <LogoutOutlined color="inherit" />
        </IconButton>
      </Row>
    </div>
  );
};
