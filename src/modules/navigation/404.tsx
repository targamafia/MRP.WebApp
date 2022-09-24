import { NavLink } from "react-router-dom";
import { Card } from "../../shared/components/card";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="max-w-md mx-auto text-black">
        <Card>
          <div className="mb-8">
            <h1 className="mb-2">¡No encontramos esa página!</h1>
            <p>Revisa si no escribiste mal el URL</p>
          </div>
          <NavLink to="/">
            <div
              className="px-8 py-2 bg-blue text-surfaces-light-2
            mx-auto rounded-md self-center"
            >
              Vuleve a casa E.T.
            </div>
          </NavLink>
        </Card>
      </div>
    </div>
  );
};
