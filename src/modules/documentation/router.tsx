import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../navigation/404';
import { BaseDocsPage } from './pages/basePage';
import { DocsMenu } from './pages/menu';
import { lazy } from 'react';

const AsignarExamen = lazy(() => import('./pages/asignarExamen'));
const CrearExamen = lazy(() => import('./pages/crearExamen'));
const CrearUsuario = lazy(() => import('./pages/crearUsuario'));
const CambiarEstilos = lazy(() => import('./pages/modificarEstilos'));

export default () => {
  return (
    <Routes>
      <Route path="" element={<BaseDocsPage />}>
        <Route index element={<DocsMenu />} />
        <Route path="asignar-examen" element={<AsignarExamen />} />
        <Route path="crear-examen" element={<CrearExamen />} />
        <Route path="crear-usuario" element={<CrearUsuario />} />
        <Route path="modificar-estilos" element={<CambiarEstilos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
