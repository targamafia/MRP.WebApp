import { ReactNode } from "react";

/*
p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10
bg-white bg-surfaces-light-1 bg-surfaces-dark-1
rounded-sm rounded-md rounded-lg
text-white text-black
*/

export const Card = (props: {
  children: ReactNode;
  padding?: number;
  bg?: string;
  rounded?: string;
  color?: string;
}) => {
  const classes = [
    "p-" + (props.padding || 8),
    "bg-" + (props.bg || "white"),
    "rounded-" + (props.rounded || "sm"),
    "text-" + (props.color || "black")
  ].join(" ");
  return <div className={classes}>{props.children}</div>;
};
