import { ErrorMessage } from "@/shared/components/errorMessage";
import { Input } from "@/shared/components/input";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { Message } from "@/shared/components/message";
import { MultiSelect } from "@/shared/components/multiSelect";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateAssessment } from "../hooks/useAssessments";
import { IAssessment, INewAssessment } from "../models";

export const AssessmentForm = () => {
  const { register, handleSubmit, setValue, formState } = useForm();
  const [message, setMessage] = useState<{ type: string; content: string }>();
  const navigate = useNavigate();

  const onSuccess = (data: IAssessment) => {
    setMessage({
      type: "info",
      content: `"${data.title}" se creó exitosamente`,
    });
    setTimeout(() => navigate("../"), 4000);
  };
  const onError = (error: any) => {
    setMessage({ type: "error", content: error });
  };

  const { mutate, error, isLoading } = useCreateAssessment(onSuccess, onError);

  const formSubmit = (assessmentData: FieldValues) => {
    if (confirm(`¿Crear ${assessmentData.title}?`))
      mutate(assessmentData as INewAssessment);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => formSubmit(data))}
      className="text-left flex flex-col items-stretch gap-6 mb-16 relative"
    >
      {!!error && (
        <Message type="error" title="Error" message={error.toString()} />
      )}
      {message !== undefined && (
        <Message
          type={message.type}
          message={message.content}
          title={message.type == "error" ? "Error" : "Éxito"}
        />
      )}
      {
        <div className="flex flex-col gap-4">
          <Input type="text" register={register} name="title" required={true} />
          <Input type="textarea" register={register} name="description" />
          <MultiSelect
            register={register}
            name="categories"
            setValue={setValue}
          />
        </div>
      }
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <input
          type="submit"
          value="Crear"
          disabled={!formState.isValid}
          className="px-8 py-2 bg-blue rounded-md text-white
          cursor-pointer hover:bg-primary-40 mx-auto"
        />
      )}
    </form>
  );
};
