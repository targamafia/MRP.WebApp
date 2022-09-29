import { ReactElement } from "react";
import { Row } from "./row";

export const MainContainer = (props: {
  children: ReactElement[] | ReactElement;
  sidebar?: ReactElement;
}) => {
  return (
    <Row spacing={4}>
      {props.sidebar !== undefined && <div className="">{props.sidebar}</div>}
      <main className="p-8 grow">{props.children}</main>
    </Row>
  );
};
