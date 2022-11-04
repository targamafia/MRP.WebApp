import ArrowForwardIosOutlined from "@mui/icons-material/ArrowForwardIos";
import { NavLink } from "react-router-dom";
import { IAssessment } from "../../models";
import { ChipRow } from "@/shared/components/chipRow";

export const AssessmentCard = (props: IAssessment & { key?: any }) => {
  return (
    <NavLink to={`${import.meta.env.BASE_URL}assessments/${props.id}`}>
      <div
        className="rounded-md bg-surface-4 text-main
      hover:bg-surface-5 transition-colors duration-300
      overflow-hidden shadow-sm outline outline-solid outline-surface-2
      hover:outline-white hover:shadow-glow w-full
      "
      >
        <div className="grid grid-cols-[minmax(2rem,8rem)_1fr_2rem] items-center pr-4">
          {props.thumbnailUrl !== undefined ? (
            <img
              src={props.thumbnailUrl}
              className="w-f self-stretch object-cover grow"
            />
          ): <div/>}
          <div
            className="grow p-4 flex items-start self-start
          flex-col pointer-events-none"
          >
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
