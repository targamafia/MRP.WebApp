import { ErrorMessage } from '@/shared/components/errorMessage';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
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
      <HandleAsyncData loading={props.loading} error={props.error}>
        {() => <h2 className="text-3xl">{props.data}</h2>}
      </HandleAsyncData>
      <p>{props.label}</p>
    </NavLink>
  );
};

export default MetricCard;
