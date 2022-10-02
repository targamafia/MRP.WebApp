import { ErrorMessage } from "@/shared/components/errorMessage";
import { Input } from "@/shared/components/input";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { Message } from "@/shared/components/message";
import { Title } from "@/shared/components/title";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateAssessmentQuestions } from "../hooks/useAssessments";
import { IQuestion } from "../models";
import { MultipleChoiceForm } from "./questionForm/multipleChoiceForm";

export const QuestionForm = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment id" />;
  const { register, handleSubmit, setValue, formState } = useForm();
  const [message, setMessage] = useState<{ type: string; content: string }>();
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState("MULTIPLE_CHOICE");
  const [isCreated, setIsCreated] = useState(false);

  const onSuccess = () => {
    setMessage({
      type: "info",
      content: `La pregunta se agregó correctamente`,
    });
    setIsCreated(true);
    setTimeout(() => navigate("../"), 2000);
  };
  const onError = (error: any) => {
    setMessage({ type: "error", content: error });
  };

  const { mutate, error, isLoading } = useUpdateAssessmentQuestions(
    id,
    onSuccess,
    onError
  );

  const formSubmit = (assessmentData: FieldValues) => {
    mutate([assessmentData] as IQuestion[]);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => formSubmit(data))}
      className="text-left flex flex-col items-stretch gap-6 mb-16 relative"
    >
      <Title back={true} title="Nueva Pregunta" />
      {!!error && (
        <Message type="error" title="Error" message={error.toString()} />
      )}
      {message !== undefined && !error && (
        <Message
          type={message.type}
          message={message.content.toString()}
          title={message.type == "error" ? "Error" : "Éxito"}
        />
      )}
      {!isCreated &&
        <div className="flex flex-col gap-4">
          <Input type="text" register={register} name="title" required={true} />
          <div className="flex flex-col gap-1">
            <label htmlFor="type">Tipo:</label>
            <select
              {...register("type")}
              onChange={(ev) => setQuestionType(ev.currentTarget.value)}
            >
              <option value="MULTIPLE_CHOICE">Opción Múltiple</option>
              <option value="BOOLEAN">Sí o No</option>
            </select>
            <input type="hidden" {...register("options[]")} />
            {questionType === "MULTIPLE_CHOICE" ? (
              <MultipleChoiceForm setValue={setValue} />
            ) : (
              <></>
            )}
          </div>
        </div>
      }
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <input
          type="submit"
          value="Crear"
          disabled={!formState.isValid && !isCreated}
          className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
        />
      )}
    </form>
  );
};
