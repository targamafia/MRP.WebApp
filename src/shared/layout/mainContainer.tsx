import { ReactElement, useState } from "react";
import { Row } from "./row";
import IconButton from "@mui/material/IconButton";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CloseOutlined,
  MenuOutlined,
} from "@mui/icons-material";

export const MainContainer = (props: {
  children: ReactElement[] | ReactElement;
  sidebar?: ReactElement;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Row spacing={12}>
        {props.sidebar !== undefined && (
          <aside
            className={
              isOpen
                ? `max-w-xs w-full bg-surface-3 rounded-md shadow-lg
                flex flex-col gap-2 p-4 shrink sticky top-0`
                : "w-0"
            }
          >
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              className={
                !isOpen
                  ? "!fixed left-4 top-16 translate-y-1/2"
                  : "!absolute right-4 top-4"
              }
            >
              {!isOpen ? <ArrowForwardIos /> : <CloseOutlined />}
            </IconButton>
            {isOpen && props.sidebar}
          </aside>
        )}
        <main className="grow max-w-5xl mx-auto">{props.children}</main>
      </Row>
    </div>
  );
};
