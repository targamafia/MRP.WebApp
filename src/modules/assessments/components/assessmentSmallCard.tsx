import { ChipRow } from "@/shared/components/chipRow";
import { NavLink } from "react-router-dom";
import { IAssessment } from "../models";

export const AssessmentSmallCard = (props: IAssessment & { key?: any }) => {
  return (
    <NavLink
      to={`/assessments/${props.id}`}
      className="rounded-md text-main flex flex-col pt-16 relative justify-end overflow-hidden"
    >
      <img
        src={props.thumbnailUrl}
        className="object-cover absolute left-0 top-0 w-full h-full
        opacity-25 hover:opacity-50 grayscale hover:grayscale-0
        outline-none bg-surface-3"
      />
      <div className="z-10 p-4 -mb-4 pointer-events-none">
        <h2 className="max-w-xs whitespace-nowrap text-ellipsis overflow-hidden">
          {props.title}
        </h2>
        <ChipRow elements={props.categories} />
      </div>
    </NavLink>
  );
};
