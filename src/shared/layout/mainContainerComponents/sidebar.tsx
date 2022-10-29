import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import { ReactNode } from 'react';

export const Sidebar = (props: {
  isOpen: boolean;
  sidebar: ReactNode;
  setIsOpen: Function;
}) => {
  return (
    <aside
      className={
        'transition-[width] duration-700 ease-in-out' +
        (props.isOpen
          ? `max-w-xs w-auto bg-surface-3 rounded-md shadow-lg z-10 top-20 overflow-y-auto
        flex flex-col gap-2 p-4 shrink h-[calc(100vh_-_7rem)] transform fixed md:sticky isolate`
          : 'w-0')
      }
    >
      {props.isOpen ? (
        <div className="!fixed right-4 top-4 z-10 !bg-surface-3">
          <IconButton onClick={() => props.setIsOpen(false)}>
            <CloseOutlined />
          </IconButton>
        </div>
      ) : (
        <div className="fixed bg-surface-5 rounded-r-[50%] left-0 md:bg-transparent md:left-4 top-12 md:top-16 translate-y-1/2">
          <IconButton onClick={() => props.setIsOpen(true)}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      )}
      {props.isOpen && props.sidebar}
    </aside>
  );
};
