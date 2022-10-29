import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIos';
import { NavLink } from 'react-router-dom';
import { IUser } from '../../models';
import { ChipRow } from '@/shared/components/chipRow';

export const UserCard = (props: IUser & { key?: any }) => {
  return (
    <NavLink to={`/users/${props.id}`}>
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
