import { ErrorMessage } from '@/shared/components/errorMessage';
import { ImageInput } from '@/shared/components/imageInput';
import { Input } from '@/shared/components/input';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Message } from '@/shared/components/message';
import { Title } from '@/shared/components/title';
import { uploadQuestionThumbnail } from '@/shared/services/fileUpload';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateAssessmentQuestion } from '../../hooks/useAssessments';
import { IAssessment, IQuestion } from '../../models';
import { MultipleChoiceForm } from '../questionForm/multipleChoiceForm';

export const QuestionForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { id: assessmentId } = useParams();
  if (!assessmentId) return <ErrorMessage message="Missing assessment id" />;

  const [message, setMessage] = useState<{ type: string; content: string }>();
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');
  const [isCreated, setIsCreated] = useState(false);

  const imageBlob = watch('imageBlob');

  const onSuccess = (assessment: IAssessment) => {
    setMessage({
      type: 'info',
      content: `La pregunta se agregó correctamente`,
    });
    if (!!imageBlob) {
      const question = assessment.questions!.pop();
      uploadQuestionThumbnail(imageBlob[0], assessmentId, question!._id);
    }
    setIsCreated(true);
    setTimeout(() => navigate('../'), 2000);
  };
  const onError = (error: any) => {
    setMessage({ type: 'error', content: error });
  };

  const { mutate, error, isLoading, reset } = useCreateAssessmentQuestion({
    assessmentId: assessmentId,
    onSuccess: onSuccess,
    onError: onError,
  });

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
    mutate(assessmentData as IQuestion);
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="text-left flex flex-col items-stretch gap-6 mb-16 relative"
    >
      <Title back={true} title="Nueva Pregunta" />
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
            defaultValue=""
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="type">Tipo:</label>
            <select
              {...register('type')}
              onChange={(ev) => setQuestionType(ev.currentTarget.value)}
              required={true}
            >
              <option value="MULTIPLE_CHOICE">Opción Múltiple</option>
              <option value="BOOLEAN">Sí o No</option>
            </select>
            <input type="hidden" {...register('options')} required={true} />
            {questionType === 'MULTIPLE_CHOICE' ? (
              <MultipleChoiceForm setValue={setValue} name="options" />
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !isCreated && (
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
