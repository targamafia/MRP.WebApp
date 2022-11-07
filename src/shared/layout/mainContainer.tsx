import { ReactElement, useState } from 'react';
import { Row } from './row';
import { Sidebar } from './mainContainerComponents/sidebar';

export const MainContainer = (props: {
  children: ReactElement[] | ReactElement;
  sidebar?: ReactElement;
  bgImg?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 max-w-[100vw]">
      {props.bgImg !== undefined ? (
        <div
          className="overflow-hidden h-32 absolute left-0 top-12
        w-full -z-10"
        >
          <div
            className="absolute left-0 top-0 h-32 w-full bg-cover
            opacity-50 bg-no-repeat bg-center blur-md scale-150"
            style={{ backgroundImage: `url('${props.bgImg}')` }}
          />
        </div>
      ) : (
        <></>
      )}
      <Row spacing={0} className="md:gap-12">
        {props.sidebar !== undefined && (
          <Sidebar
            sidebar={props.sidebar}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
        <main className="grow max-w-5xl mx-auto w-full">{props.children}</main>
      </Row>
    </div>
  );
};
