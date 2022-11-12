import { ReactElement, useState } from 'react';
import { Row } from './row';
import { Sidebar } from './mainContainerComponents/sidebar';

export const MainContainer = (props: {
  children: ReactElement[] | ReactElement;
  sidebar?: ReactElement;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 max-w-[100vw] self-stretch overflow-y-auto box-border">
      <Row spacing={0} className="md:gap-12">
        {props.sidebar !== undefined && (
          <Sidebar
            sidebar={props.sidebar}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
        <main className="grow max-w-5xl mx-auto w-full h-full overflow-y-auto overflow-x-hidden">
          {props.children}
        </main>
      </Row>
    </div>
  );
};
