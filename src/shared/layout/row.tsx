import { ReactElement, ReactNode } from "react";
/*
gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10
justify-start justify-center justify-end justify-between justify-around justify-evenly
items-start items-center items-end items-between items-around items-evenly
*/

export const Row = (props: {
  children: ReactNode;
  grow?: boolean;
  spacing?: number;
  justify?: string;
  items?: string;
}) => {
  const classes = [
    "flex",
    "flex-row",
    "flex-wrap",
    props.grow && "flex-grow",
    "gap-" + (props.spacing || 0),
    "justify-" + (props.justify || "start"),
    "items-" + (props.items || "start"),
  ].join(" ");
  return <div className={classes}>{props.children}</div>;
};
