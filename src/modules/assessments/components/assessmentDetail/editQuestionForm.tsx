import { ImageInput } from '@/shared/components/imageInput';
import { Input } from '@/shared/components/input';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Message } from '@/shared/components/message';
import { Title } from '@/shared/components/title';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  useAddQuestionImage,
  useUpdateAssessmentQuestion,
} from '../../hooks/useAssessments';
import { IQuestion } from '../../models';
import { MultipleChoiceForm } from '../questionForm/multipleChoiceForm';

export const EditQuestionForm = (props: {
  assessmentId: string;
  question: IQuestion;
}) => {
  const [message, setMessage] = useState<{ type: string; content: string }>();
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');
  const [isCreated, setIsCreated] = useState(false);

  const onError = (error: any) => {
    setMessage({ type: 'error', content: error });
  };

  const onUploadSuccess = () => {
    setMessage({
      type: 'info',
      content: `La pregunta se actualizó correctamente`,
    });

    setIsCreated(true);
    setTimeout(() => navigate('../'), 2000);
  };

  const { mutate: uploadQuestionThumbnail, isLoading: uploadLoading } =
    useAddQuestionImage(
      props.assessmentId,
      props.question._id! || props.question.id!,
      onUploadSuccess,
      onError
    );

  const onEditSuccess = () => {
    if (imageBlob !== undefined && (imageBlob[0] as File)?.size > 0)
      return uploadQuestionThumbnail(imageBlob[0]);
    onUploadSuccess();
  };

  const { mutate, error, isLoading, reset } = useUpdateAssessmentQuestion({
    assessmentId: props.assessmentId,
    questionId: props.question._id! || props.question.id!,
    onSuccess: onEditSuccess,
    onError: onError,
  });

  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    defaultValues: { ...props.question, imageBlob: undefined },
  });

  const imageBlob = watch('imageBlob');

  const validateOptions = (assessmentData: IQuestion) => {
    return (
      assessmentData.options.length >= 2 &&
      assessmentData.options.some((opt) => opt.isCorrectAnswer)
    );
  };

  const formSubmit = (assessmentData: FieldValues) => {
    setMessage(undefined);
    reset();
    if (!validateOptions(assessmentData as IQuestion))
      return onError('La pregunta no es válida');
    delete assessmentData.imageBlob;
    return mutate(assessmentData as IQuestion);
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="text-left flex flex-col items-stretch gap-6 mb-16 relative"
    >
      <Title back={true} title="Editar Pregunta" />
      {!isCreated && (
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            register={register}
            name="title"
            label="Pregunta"
            required={true}
          />
          <ImageInput
            name="imageUrl"
            register={register}
            setValue={setValue}
            blob={imageBlob}
            label="Imagen"
            defaultValue={props.question.imageUrl}
          />
          <div className="flex flex-col gap-1">
            <input
              type="hidden"
              value="MULTIPLE_CHOICE"
              {...register('type', { required: true })}
            />
            <input
              type="hidden"
              {...register('options', { required: true })}
              value={
                (getValues().options && getValues().options.toString()) || ''
              }
            />
            {questionType === 'MULTIPLE_CHOICE' ? (
              <MultipleChoiceForm
                setValue={setValue}
                name="options"
                defaultValue={getValues().options}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      {!!error && (
        <Message type="error" title="Error" message={error.toString()} />
      )}
      {message !== undefined && !error && (
        <Message
          type={message.type}
          message={message.content.toString()}
          title={message.type == 'error' ? 'Error' : 'Éxito'}
        />
      )}
      {isLoading || uploadLoading ? (
        <LoadingSpinner />
      ) : (
        !isCreated && (
          <input
            type="submit"
            value="Actualizar"
            className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
          />
        )
      )}
    </form>
  );
};
