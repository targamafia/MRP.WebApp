import { useAssessment } from "../hooks/useAssessments";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "@/shared/components/errorMessage";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { AssessmentCard } from "./assessmentCard";
import { ChipRow } from "@/shared/components/chipRow";
import { Title } from "@/shared/components/title";

export const AssessmentDetails = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;
  const { assessment, error, loading } = useAssessment(id);

  return !loading ? (
    !error ? (
      assessment !== undefined ? (
        <>
          <Title title="Detalles" />
          <h2>Categorías</h2>
          {assessment.categories !== undefined && (
            <ChipRow elements={assessment.categories} />
          )}
          <h2 className="mb-2">Descripción</h2>
          <p className="mb-8">
            {assessment.description !== undefined
              ? assessment.description
              : "Sin descripción"}
          </p>
          <hr />
          <h2 className="mb-4">Vista Previa</h2>
          <div className="p-8 rounded-md bg-surface-2">
            <AssessmentCard {...assessment} id={id} />
          </div>
        </>
      ) : (
        <></>
      )
    ) : (
      <ErrorMessage message={error.toString()} />
    )
  ) : (
    <LoadingSpinner />
  );
};
