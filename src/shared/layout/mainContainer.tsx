import { ReactElement, useState } from 'react';
import { Sidebar } from './mainContainerComponents/sidebar';

export const MainContainer = (props: {
  children: ReactElement[] | ReactElement;
  sidebar?: ReactElement;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 grow box-border flex flex-row md:gap-12 overflow-y-auto">
      {props.sidebar !== undefined && (
        <Sidebar
          sidebar={props.sidebar}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <main className="max-w-5xl mx-auto justify-start h-fit w-full">
        {props.children}
      </main>
    </div>
  );
};
