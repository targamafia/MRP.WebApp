import { Input } from '@/shared/components/input';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Message } from '@/shared/components/message';
import { MultiSelect } from '@/shared/components/multiSelect';
import { Row } from '@/shared/layout/row';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  useDeleteAssessment,
  useUpdateAssessment,
} from '../../hooks/useAssessments';
import { IAssessment } from '../../models';

function EditDetailsForm(props: { assessment: IAssessment }) {
  const { register, handleSubmit, setValue, formState, getValues } = useForm({
    defaultValues: {
      title: props.assessment.title,
      description: props.assessment.description,
      categories: props.assessment.categories,
    },
  });
  const [message, setMessage] = useState<{ type: string; content: string }>();
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const onSuccess = (data: IAssessment) => {
    setMessage({
      type: 'info',
      content: `Cambios en "${data.title}" se guardaron correctamente`,
    });
    setCreated(true);
    setTimeout(() => navigate('../'), 2000);
  };
  const onError = (error: any) => {
    setMessage({ type: 'error', content: error });
  };

  const { mutate, error, isLoading } = useUpdateAssessment(onSuccess, onError);
  const {
    mutate: deleteMutate,
    error: deleteError,
    isLoading: deleteLoading,
  } = useDeleteAssessment(() => navigate('../../'));

  const deleteAssessment = () => {
    if (
      !confirm(
        `Estás a punto de borrar ${props.assessment.title}, esto no se puede deshacer.
        ¿Quieres continuar?`
      )
    )
      return;

    deleteMutate(props.assessment._id || props.assessment.id);
    setCreated(true);
    setMessage({
      type: 'info',
      content: `${props.assessment.title} se borró correctamente`,
    });
  };

  const formSubmit = (assessmentData: FieldValues) => {
    if (
      !!assessmentData.title &&
      confirm(`¿Modificar ${assessmentData.title}?`)
    )
      mutate({ ...props.assessment, ...assessmentData } as IAssessment);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => formSubmit(data))}
      className="text-left flex flex-col items-stretch gap-6 mb-16 relative"
    >
      {!!error && (
        <Message type="error" title="Error" message={error.toString()} />
      )}
      {!!deleteError && (
        <Message type="error" title="Error" message={deleteError.toString()} />
      )}
      {message !== undefined && (
        <Message
          type={message.type}
          message={message.content}
          title={message.type == 'error' ? 'Error' : 'Éxito'}
        />
      )}
      {!created && (
        <div className="flex flex-col gap-4">
          <NavLink to="../">
            <ArrowBackIos />
          </NavLink>
          <Input type="text" register={register} name="title" required={true} />
          <Input type="textarea" register={register} name="description" />
          <MultiSelect
            register={register}
            name="categories"
            setValue={setValue}
            defaultValue={getValues().categories}
          />
        </div>
      )}
      {isLoading || deleteLoading ? (
        <LoadingSpinner />
      ) : (
        <Row spacing={4} items="stretch" justify="center">
          <div
            className="bg-error-50 rounded-md text-white px-8
          py-2 hover:bg-error-60 cursor-pointer"
            onClick={deleteAssessment}
          >
            Delete
          </div>
          <input
            type="submit"
            value="Guardar"
            disabled={!formState.isValid && !created}
            className="px-8 py-2 bg-blue rounded-md text-white
            cursor-pointer hover:bg-primary-40"
          />
        </Row>
      )}
    </form>
  );
}

export default EditDetailsForm;
