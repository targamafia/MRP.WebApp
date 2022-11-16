import { ImageInput } from '@/shared/components/imageInput';
import { Input } from '@/shared/components/input';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Message } from '@/shared/components/message';
import { MultiSelect } from '@/shared/components/multiSelect';
import { uploadAssessmentThumbnail } from '@/shared/services/fileUpload';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateAssessment } from '../../hooks/useAssessments';
import { IAssessment, INewAssessment } from '../../models';

export const AssessmentForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [message, setMessage] = useState<{ type: string; content: string }>();
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const imageBlob = watch('imageBlob');

  const onError = (error: any) => {
    setMessage({ type: 'error', content: error });
  };

  const onSuccess = (data: IAssessment) => {
    setMessage({
      type: 'info',
      content: `"${data.title}" se creó exitosamente`,
    });
    if (!!imageBlob) {
      uploadAssessmentThumbnail(imageBlob[0], `${data._id || data.id || ''}`);
    }
    setCreated(true);
    setTimeout(() => navigate('/assessments/' + (data._id || data.id)), 2000);
  };

  const { mutate, error, isLoading } = useCreateAssessment(onSuccess, onError);

  const formSubmit = (assessmentData: FieldValues) => {
    if (!confirm(`¿Crear ${assessmentData.title}?`)) return;
    delete assessmentData.imageBlob;
    mutate(assessmentData as INewAssessment);
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="text-left flex flex-col items-stretch gap-6 mb-16 relative"
    >
      {!!error && (
        <Message type="error" title="Error" message={error.toString()} />
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
          <Input
            type="text"
            register={register}
            name="title"
            label="Nombre"
            required={true}
          />
          <Input
            type="textarea"
            register={register}
            name="description"
            label="Descripción"
          />
          <ImageInput
            name="thumbnailUrl"
            register={register}
            setValue={setValue}
            blob={imageBlob}
            label="Imagen"
            defaultValue=""
          />
          <MultiSelect
            register={register}
            name="categories"
            setValue={setValue}
            label="Categorías"
          />
        </div>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !created && (
          <input
            type="submit"
            value="Crear"
            className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
          />
        )
      )}
    </form>
  );
};
