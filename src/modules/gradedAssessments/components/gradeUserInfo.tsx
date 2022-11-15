import { useUser } from '@/modules/users/hooks/useUserHooks';
import { IApplicant } from '@/modules/users/models';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { NavLink } from 'react-router-dom';

export const GradeUserInfo = (props: { applicant: undefined | IApplicant }) => {
  if (!props.applicant) return <></>;
  const { user, error, loading } = useUser(props.applicant.id);
  return (
    <HandleAsyncData error={error} loading={loading}>
      {() => (
        <NavLink
          to={`/users/${props.applicant?.id}`}
          className="underline text-orange"
        >
          <p>{user.name} {user.lastName}</p>
        </NavLink>
      )}
    </HandleAsyncData>
  );
};
