import { MouseEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";
import { ErrorMessage } from "./errorMessage";

export const Modal = (props: {
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  close: MouseEventHandler;
}) => {
  const target = document.getElementById("modal");
  if (!target) return <ErrorMessage message="Missing modal div" />;
  return props.isOpen ? ReactDOM.createPortal(
    <>
      <div
        className="bg-surface-5 bg-opacity-75 backdrop-blur-lg -z-10"
        onClick={props.close}
      ></div>
      {props.children}
    </>,
    target
  ) : <></>;
};
