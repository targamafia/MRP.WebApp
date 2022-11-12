import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { NavLink } from 'react-router-dom';

const MetricCard = (props: {
  to: string;
  data: any;
  loading: boolean;
  error: unknown;
  label: string;
}) => {
  return (
    <NavLink
      to={props.to}
      className="p-8 grow bg-surface-4 text-center border
      border-amber-400 rounded-md hover:scale-105
      transition-all hover:bg-surface-5 duration-100"
    >
      {props.loading ? (
        <LoadingSpinner />
      ) : props.error ? (
        <ErrorMessage message={props.error.toString()} />
      ) : (
        <h2 className="text-3xl">{props.data}</h2>
      )}
      <p>{props.label}</p>
    </NavLink>
  );
};

export default MetricCard;
