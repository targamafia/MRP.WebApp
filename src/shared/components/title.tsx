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
    <div className="flex flex-row mb-8 md:items-center grow gap-2">
      {props.back && (
        <div
          className="transition-transform hover:scale-110 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIos />
        </div>
      )}
      <h1 className="grow">{props.title}</h1>
      {props.cta !== undefined && props.cta}
    </div>
  );
};
