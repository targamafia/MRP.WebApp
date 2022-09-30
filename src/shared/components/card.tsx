import { ReactNode } from "react";

/*
p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10
bg-back bg-main bg-surface-1 bg-surface-2 bg-surface-3 bg-surface-4 bg-surface-5
rounded-sm rounded-md rounded-lg
text-back text-main
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
    "text-" + (props.color || "main")
  ].join(" ");
  return <div className={classes}>{props.children}</div>;
};
