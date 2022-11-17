import ArrowForwardIosOutlined from '@mui/icons-material/ArrowForwardIos';
import { NavLink } from 'react-router-dom';
import { IAssessment } from '../../models';
import { ChipRow } from '@/shared/components/chipRow';
import LockOutlined from '@mui/icons-material/LockOutlined';
import StarOutlined from '@mui/icons-material/StarOutlined';

export const AssessmentCard = (props: { assessment: IAssessment }) => {
  return (
    <NavLink to={`/assessments/${props.assessment.id}`}>
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
              props.assessment.thumbnailUrl ||
              `${import.meta.env.BASE_URL}placeholder.png`
            }
            className="w-f self-stretch object-cover grow"
            loading="lazy"
          />
          <div
            className="grow p-4 flex items-start self-start
          flex-col pointer-events-none"
          >
            <div className="flex flex-row">
              {props.assessment.isPrivate && <LockOutlined className="mb-4" />}
              {props.assessment.isPremium && (
                <StarOutlined className="mb-4 text-amber-400" />
              )}
            </div>
            {props.assessment.categories !== undefined && (
              <ChipRow elements={props.assessment.categories} />
            )}
            <h3 className="text-3xl mb-2">{props.assessment.title}</h3>
            {props.assessment.description !== undefined && (
              <p className="mb-4">{props.assessment.description}</p>
            )}
          </div>
          <ArrowForwardIosOutlined color="info" />
        </div>
      </div>
    </NavLink>
  );
};
