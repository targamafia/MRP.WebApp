import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIos';
import { NavLink } from 'react-router-dom';
import { IAssessment } from '../../models';
import { ChipRow } from '@/shared/components/chipRow';
import LockOutlined from '@mui/icons-material/LockOutlined';
import StarOutlined from '@mui/icons-material/StarOutlined';

export const AssessmentCard = (props: IAssessment & { key?: any }) => {
  return (
    <NavLink to={`/assessments/${props.id}`}>
      <div
        className="rounded-md bg-surface-4 text-main
      hover:bg-surface-5 transition-all duration-300
      overflow-hidden shadow-sm outline outline-solid outline-surface-2
      hover:outline-white hover:shadow-glow w-full hover:translate-x-4
      "
      >
        <div className="grid grid-cols-[minmax(2rem,8rem)_1fr_2rem] items-center pr-4">
          <img
            src={
              props.thumbnailUrl || `${import.meta.env.BASE_URL}placeholder.png`
            }
            className="w-f self-stretch object-cover grow"
          />
          <div
            className="grow p-4 flex items-start self-start
          flex-col pointer-events-none"
          >
            <div className="flex flex-row">
              {props.isPrivate && <LockOutlined className="mb-4" />}
              {props.isPremium && <StarOutlined className="mb-4 text-amber-400" />}
            </div>
            {props.categories !== undefined && (
              <ChipRow elements={props.categories} />
            )}
            <h3 className="text-3xl mb-2">{props.title}</h3>
            {props.description !== undefined && (
              <p className="mb-4">{props.description}</p>
            )}
          </div>
          <ArrowForwardIosOutlined color="info" />
        </div>
      </div>
    </NavLink>
  );
};
