import { IUser } from '../../models';
import { UserCard } from './userCard';

export const UserList = (props: { users: IUser[] | [] }) => {
  return (
    <div className="flex flex-col gap-4 w-full overflow-x-scroll">
      <table
        className="items-center border-spacing-y-2
      border-separate w-full overflow-x-scoll"
      >
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
            props.users.map((user: IUser, i) => (
              <UserCard key={user._id} user={user} />
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
