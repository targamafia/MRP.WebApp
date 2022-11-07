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
      onClick={() => navigate(props.id || '')}
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
        <NavLink to={props.id || ''}>
          <ArrowForwardIosOutlined color="info" />
        </NavLink>
      </td>
    </tr>
  );
};
