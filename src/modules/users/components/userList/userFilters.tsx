import { MultiselectFilter } from '@/shared/components/multiselectFilter';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { useMemo, useState } from 'react';
import { IUser } from '../../models';

export const UserFilters = (props: {
  users: IUser[];
  dispatch: Function;
  state: { roles: string[] };
}) => {
  const [roles, setCategories] = useState<string[]>([]);

  const updateCategoryFilters = () => {
    if (!props.users) return setCategories([]);
    const roles: string[] = [];
    for (var i = 0; i < props.users.length; i++) {
      const user = props.users[i];
      for (var x = 0; x < user.roles.length; x++) {
        const category = user.roles[x];
        if (roles.includes(category)) continue;
        roles.push(category);
      }
    }
    setCategories(roles);
  };

  useMemo(() => {
    updateCategoryFilters();
  }, [props.users]);

  return (
    <div className="rounded-md flex flex-col md:flex-row gap-8">
      <div className="flex flex-row gap-4 items-center relative my-4 grow">
        <h3 className="mt-4 hidden" aria-hidden>
          Buscar
        </h3>
        <input
          type="text"
          id="query"
          placeholder="Buscar"
          autoComplete="off"
          aria-label="Buscar"
          className="outline outline-surface-5 w-full mt-2 placeholder:text-main placeholder:opacity-60 pl-10"
          onChange={(ev) =>
            props.dispatch({ property: 'query', value: ev.currentTarget.value })
          }
        />
        <SearchOutlined className="absolute left-2 mt-1 top-1/2 -translate-y-1/2" />
      </div>
      <div className="flex flex-col grow">
        <h3 className="mt-4">Rol</h3>
        <MultiselectFilter
          allOptions={roles}
          selectedOptions={props.state.roles}
          onChange={(value: string) =>
            props.dispatch({ property: 'roles', value })
          }
        />
      </div>
    </div>
  );
};
