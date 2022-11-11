import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIos';
import { NavLink, useNavigate } from 'react-router-dom';
import { IUser } from '../../models';
import { ChipRow } from '@/shared/components/chipRow';

export const UserCard = (props: {user: IUser}) => {
  const navigate = useNavigate();

  return (
    <tr
      className="bg-surface-4 text-main rounded-lg cursor-pointer
      hover:bg-surface-5 hover:border-surface-1 hover:shadow-sm overflow-hidden"
      onClick={() => navigate(props.user._id || props.user.id || '')}
      key={props.user._id || props.user.id}
    >
      <td className="px-4 py-2">
        <h3>
          {props.user.name} {props.user.lastName}
        </h3>
      </td>
      <td className="px-4 py-2">
        <p>{props.user.email}</p>
      </td>
      <td className="px-4 py-2">
        <p>{props.user.companyCode}</p>
      </td>
      <td className="px-4 py-2 image.pngpointer-events-none">
        <ChipRow elements={props.user.roles} noMargin={true} />
      </td>
      <td className="">
        <NavLink to={props.user.id || ''}>
          <ArrowForwardIosOutlined color="info" />
        </NavLink>
      </td>
    </tr>
  );
};
