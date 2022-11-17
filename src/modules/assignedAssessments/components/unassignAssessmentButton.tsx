import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useUnassignAssessmentFromUser } from '../hooks/useAssignedAssessments';

export const UnassignAssessmentButton = (props: {
  userId: string;
  assessmentId: string;
}) => {
  const { mutate, error, isLoading } = useUnassignAssessmentFromUser(
    props.userId,
    () => alert('cancelado')
  );

  const HandleClick = () => {
    confirm(`Estás a punto de desasignar este examen
    ¿Quieres continuar?`) && mutate(props.assessmentId);
  };
  return (
    <HandleAsyncData error={error} loading={isLoading}>
      {() => (
        <div
          className="rounded-full w-8 h-8 bg-red-600
    text-white cursor-pointer scale-100 hover:scale-110
    transition-transform duration-150 absolute right-2 top-2
    flex justify-center items-center"
          onClick={HandleClick}
        >
          <CloseOutlined />
        </div>
      )}
    </HandleAsyncData>
  );
};
