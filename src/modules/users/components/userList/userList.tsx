import { IUser } from '../../models';
import { UserCard } from './userCard';

export const UserList = (props: { users: IUser[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-4 grid grid-cols-[minmax(max-content,_1fr)_minmax(max-content,_1fr)_minmax(max-content,_1fr)_minmax(min-content,_1fr)_1rem] gap-4 items-center pr-4">
        <h3>Nombre</h3>
        <p>Correo</p>
        <p>Compañia</p>
        <p>Roles</p>
      </div>
      <div className="flex flex-col gap-1">
        {props.users !== undefined &&
          props.users.map((user: IUser) => (
            <UserCard key={user.id} {...user} />
          ))}
      </div>
    </div>
  );
};
