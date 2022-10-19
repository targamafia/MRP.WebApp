import { ArrowBackIos } from "@mui/icons-material";
import { ReactElement } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Row } from "../layout/row";

export const Title = (props: {
  title: string;
  back?: boolean;
  cta?: ReactElement;
}): ReactElement => {
  return (
    <div className="flex flex-col md:flex-row mb-8 md:items-center grow gap-2">
      {props.back && (
        <NavLink to="../">
          <ArrowBackIos />
        </NavLink>
      )}
      <h1 className="grow">{props.title}</h1>
      {props.cta !== undefined && props.cta}
    </div>
  );
};
