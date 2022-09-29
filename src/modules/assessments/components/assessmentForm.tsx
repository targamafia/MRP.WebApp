import { Input } from "@/shared/components/input";
import { MultiSelect } from "@/shared/components/multiSelect";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateAssessment } from "../hooks/useAssessments";
import { INewAssessment } from "../models";

export const AssessmentForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { mutate, error, isLoading } = useCreateAssessment();
  const navigate = useNavigate();

  const formSubmit = (assessmentData: FieldValues) => {
    /*
        title: string;
        createdBy: string;
        thumbnailUrl?: string;
        description?: string;
        durationInSeconds?: number;
        isPrivate: boolean;
        isPremium: boolean;
        availableDate: Date;
        startDate: Date;
        expirationDate: Date;
        categories: string[];
    */
    if (confirm(`¿Crear ${assessmentData.title}?`))
      mutate(assessmentData as INewAssessment);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => formSubmit(data))}
      className="text-left flex flex-col items-stretch gap-6 mb-16"
    >
      <div className="flex flex-col gap-4">
        <Input type="text" register={register} name="title" required={true} />
        <Input type="textarea" register={register} name="description" />
        <MultiSelect
          register={register}
          name="categories"
          setValue={setValue}
        />
      </div>
      <input
        type="submit"
        value="Crear"
        className="px-8 py-2 bg-blue rounded-md cursor-pointer hover:bg-primary-40 mx-auto"
      />
    </form>
  );
};
