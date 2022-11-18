import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export const Title = (props: {
  title: string;
  back?: boolean;
  cta?: ReactElement;
}): ReactElement => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row mb-8 md:items-center grow gap-2">
      <div className="flex flex-row gap-2 items-center grow">
        {props.back && (
          <div
            className="transition-transform hover:scale-110 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIos />
          </div>
        )}
        <h1 className="grow">{props.title}</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        {props.cta !== undefined && props.cta}
      </div>
    </div>
  );
};
