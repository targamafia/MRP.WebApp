import { NavLink } from 'react-router-dom';

export const DocsMenu = () => {
  return (
    <div>
      <h1 className="mb-8">Documentación de Usuario Final</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-stretch">
        <NavLink
          to="crear-examen"
          className="p-8 bg-blue text-white text-center
          font-bold text-xl rounded-md flex items-center justify-center"
        >
          Como Crear un Examen
        </NavLink>
        <NavLink
          to="asignar-examen"
          className="p-8 bg-blue text-white text-center
          font-bold text-xl rounded-md flex items-center justify-center"
        >
          Como Asignar un Examen
        </NavLink>
        <NavLink
          to="crear-usuario"
          className="p-8 bg-blue text-white text-center
          font-bold text-xl rounded-md flex items-center justify-center"
        >
          Crear un Nuevo Usuario Administrador
        </NavLink>
        <NavLink
          to="modificar-estilos"
          className="p-8 bg-blue text-white text-center
          font-bold text-xl rounded-md flex items-center justify-center"
        >
          Modificar el Estilo de la Aplicación Web
        </NavLink>
      </div>
    </div>
  );
};
