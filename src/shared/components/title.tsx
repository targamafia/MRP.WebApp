import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export const Title = (props: {
  title: string;
  back?: boolean;
  cta?: ReactElement;
}): ReactElement => {
  return (
    <div className="flex flex-row mb-8 md:items-center grow gap-2">
      {props.back && (
        <NavLink to="../">
          <ArrowBackIos />
        </NavLink>
      )}
      <h1 className="grow">{props.title}</h1>
      {props.cta !== undefined && props.cta}
    </div>
  );
};
