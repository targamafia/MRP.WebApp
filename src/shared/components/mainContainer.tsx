import { ReactElement } from "react";
import { Row } from "./row";

export const MainContainer = (props: {
  children: ReactElement[];
  sidebar: ReactElement;
}) => {
  return (
    <Row spacing={4}>
      <div className="">{props.sidebar}</div>
      <main className="p-16">{props.children}</main>
    </Row>
  );
};
