import { ErrorMessage } from '@/shared/components/errorMessage';
import { Input } from '@/shared/components/input';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Message } from '@/shared/components/message';
import { Title } from '@/shared/components/title';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateAssessmentQuestion } from '../../hooks/useAssessments';
import { IQuestion } from '../../models';
import { MultipleChoiceForm } from '../questionForm/multipleChoiceForm';

export const QuestionForm = () => {
  const { id: assessmentId, questionId } = useParams();
  if (!assessmentId) return <ErrorMessage message="Missing assessment id" />;

  const [message, setMessage] = useState<{ type: string; content: string }>();
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');
  const [isCreated, setIsCreated] = useState(false);

  const onSuccess = () => {
    setMessage({
      type: 'info',
      content: `La pregunta se agregó correctamente`,
    });
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

  const { register, handleSubmit, setValue, formState } = useForm();

  const validateOptions = (assessmentData: IQuestion) => {
    return (
      assessmentData.options.length >= 2 &&
      assessmentData.options.some((opt) => opt.isCorrectAnswer)
    );
  };

  const formSubmit = (assessmentData: FieldValues) => {
    setMessage(undefined);
    reset();
    if (validateOptions(assessmentData as IQuestion))
      return mutate(assessmentData as IQuestion);
    onError('La pregunta no es válida');
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="text-left flex flex-col items-stretch gap-6 mb-16 relative"
    >
      <Title back={true} title="Nueva Pregunta" />
      {!isCreated && (
        <div className="flex flex-col gap-4">
          <Input type="text" register={register} name="title" label="Pregunta" required={true} />
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
            disabled={!formState.isValid && !isCreated}
            className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
          />
        )
      )}
    </form>
  );
};
