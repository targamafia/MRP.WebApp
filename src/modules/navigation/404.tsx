import { NavLink } from 'react-router-dom';
import { Card } from '@/shared/components/card';

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="max-w-md mx-auto text-main">
        <Card>
          <div className="mb-8">
            <h1 className="mb-2">¡No encontramos esa página!</h1>
            <p>Revisa si no escribiste mal el URL</p>
          </div>
          <NavLink to="../" className="text-center w-auto mx-auto">
            <div className="px-8 py-2 bg-blue text-surfaces-light-2 rounded-md text-white">
              Vuleve a casa E.T.
            </div>
          </NavLink>
        </Card>
      </div>
    </div>
  );
};
