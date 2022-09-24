import { ReactElement, ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const Title = (props: { title: string }): ReactElement => {
  return (
    <>
      <h1 className="p-8">{props.title}</h1>
      <Outlet />
    </>
  );
};
