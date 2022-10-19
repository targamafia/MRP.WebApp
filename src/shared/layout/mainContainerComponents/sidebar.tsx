import { ArrowForwardIos, CloseOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ReactNode } from "react";

export const Sidebar = (props: {
  isOpen: boolean;
  sidebar: ReactNode;
  setIsOpen: Function;
}) => {
  return (
    <aside
      className={
        props.isOpen
          ? `max-w-xs w-full bg-surface-3 rounded-md shadow-lg z-10 top-20 overflow-y-auto
        flex flex-col gap-2 p-4 shrink fixed md:sticky h-[calc(100vh_-_7rem)] isolate
        transform`
          : "w-0"
      }
    >
      <div
        className={
          !props.isOpen
            ? "fixed bg-neutral-90 rounded-r-[50%] left-0 md:bg-transparent md:left-4 top-12 md:top-16 translate-y-1/2"
            : "!fixed right-4 top-4 z-10 !bg-surface-3"
        }
      >
        <IconButton onClick={() => props.setIsOpen(!props.isOpen)}>
          {!props.isOpen ? <ArrowForwardIos /> : <CloseOutlined />}
        </IconButton>
      </div>
      {props.isOpen && props.sidebar}
    </aside>
  );
};
