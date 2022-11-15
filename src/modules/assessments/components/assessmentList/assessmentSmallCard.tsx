import { NavLink } from 'react-router-dom';
import { IAssessment } from '../../models';

export const AssessmentSmallCard = (props: IAssessment & { key?: any }) => {
  return (
    <NavLink
      to={`/assessments/${props.id}`}
      className="rounded-md text-white flex flex-col pt-16 relative justify-end
      overflow-hidden isolate bg-blue max-w-sm hover:scale-105 transition-transform"
    >
      <img
        src={props.thumbnailUrl || `${import.meta.env.BASE_URL}placeholder.png`}
        className="object-cover absolute left-0 top-0 w-full h-full
        opacity-50 hover:opacity-60 outline-none"
      />
      <div className="z-10 p-2 pointer-events-none">
        <h2
          className="max-w-xs whitespace-nowrap text-ellipsis
        overflow-hidden mb-1"
        >
          {props.title}
        </h2>
        {props.categories.length > 0 && <p>{props.categories[0]}</p>}
      </div>
    </NavLink>
  );
};
