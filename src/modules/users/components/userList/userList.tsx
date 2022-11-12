import { IUser } from '../../models';
import { UserCard } from './userCard';

export const UserList = (props: { users: IUser[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-4 grid grid-cols-[minmax(max-content,_1fr)_minmax(max-content,_1fr)_minmax(max-content,_1fr)_minmax(min-content,_1fr)_1rem] gap-4 items-center pr-4"></div>
      <table className="items-center border-spacing-y-2 border-separate">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Correo</th>
            <th className="px-4 py-2">Compañia</th>
            <th className="px-4 py-2">Roles</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.users.length !== 0 ? (
            props.users.map((user: IUser) => (
              <UserCard key={user._id || user.id} user={user} />
            ))
          ) : (
            <tr>
              <td>
                <p>No se encontraron usuarios</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
