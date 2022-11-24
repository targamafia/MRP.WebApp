import { NavLink } from 'react-router-dom';

export const DocsMenu = () => {
  return (
    <div>
      <h1 className="mb-8">Documentación de Usuario Final</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <NavLink to="crear-examen">
          <div className="p-8 bg-blue text-white text-center font-bold text-xl rounded-md">
            Como Crear un Examen
          </div>
        </NavLink>
        <NavLink to="asignar-examen">
          <div className="p-8 bg-blue text-white text-center font-bold text-xl rounded-md">
            Como Asignar un Examen
          </div>
        </NavLink>
      </div>
    </div>
  );
};
