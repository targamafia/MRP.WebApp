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
    <Row spacing={2} items="center" grow={true} className="mb-8">
      {props.back && (
        <NavLink to="../">
          <ArrowBackIos />
        </NavLink>
      )}
      <h1 className="grow">{props.title}</h1>
      {props.cta !== undefined && props.cta}
    </Row>
  );
};
