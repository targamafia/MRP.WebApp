import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIos';
import { NavLink, useNavigate } from 'react-router-dom';
import { IUser } from '../../models';
import { ChipRow } from '@/shared/components/chipRow';

export const UserCard = (props: IUser & { key?: any }) => {
  const navigate = useNavigate();
  return (
    <tr
      className="bg-surface-4 text-main rounded-lg cursor-pointer
      hover:bg-surface-5 hover:border-surface-1 hover:shadow-sm overflow-hidden"
      onClick={() => navigate(`/${import.meta.env.BASE_URL}/users/${props.id}`)}
    >
      <td className="px-4 py-2">
        <h3>{props.name + ' ' + props.lastName}</h3>
      </td>
      <td className="px-4 py-2">
        <p>{props.email}</p>
      </td>
      <td className="px-4 py-2">
        <p>{props.companyCode}</p>
      </td>
      <td className="px-4 py-2 pointer-events-none">
        <ChipRow elements={props.roles} noMargin={true} />
      </td>
      <td className="">
        <NavLink to={`${import.meta.env.BASE_URL}users/${props.id}`}>
          <ArrowForwardIosOutlined color="info" />
        </NavLink>
      </td>
    </tr>
  );
  return (
    <NavLink to={`/${import.meta.env.BASE_URL}/users/${props.id}`}>
      <div
        className="bg-surface-4 text-main
      hover:bg-surface-5 transition-colors duration-300
      overflow-hidden outline outline-solid outline-surface-2
      hover:outline-white hover:shadow-glow w-full py-2 px-4
      "
      >
        <div className="grid grid-cols-[minmax(max-content,_1fr)_minmax(max-content,_1fr)_minmax(max-content,_1fr)_minmax(min-content,_1fr)_1rem] gap-4 items-center pr-4">
          <h3>{props.name + ' ' + props.lastName}</h3>
          <p>{props.email}</p>
          <p>{props.companyCode}</p>
          <ChipRow elements={props.roles} noMargin={true} />

          <ArrowForwardIosOutlined color="info" />
        </div>
      </div>
    </NavLink>
  );
};
