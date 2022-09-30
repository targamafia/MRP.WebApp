import { ErrorMessage } from "@/shared/components/errorMessage";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { Message } from "@/shared/components/message";
import { Title } from "@/shared/components/title";
import { NavLink, useParams } from "react-router-dom";
import { useAssessment } from "../hooks/useAssessments";

export const AssessmentQuestions = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;
  const { assessment, error, loading } = useAssessment(id);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <div className="flex flex-col gap-8">
      <Title
        title="Preguntas"
        cta={
          <NavLink to="new" className="bg-blue px-4 py-2 rounded-md text-white">
            Agregar Pregunta
          </NavLink>
        }
      />
      {assessment !== undefined ? (
        !!assessment.questions && assessment.questions?.length > 0 ? (
          assessment.questions.map((question, i) => (
            <div
              key={i}
              className={[
                question.correctOption ? "bg-surface-5" : "bg-surface-2",
                "rounded-md p-4",
              ].join(" ")}
            >
              <h3 className="mb-4 text-2xl font-bold">{question.title}</h3>
              {question.options.map((option, i) => (
                <div
                  className={[
                    "p-2 flex flex-row gap-4",
                    option.isCorrectAnswer ? "text-orange" : "",
                  ].join(" ")}
                  key={i}
                >
                  <h4 className="w-6 text-xl font-bold">{i + 1}</h4>
                  {option.value}
                </div>
              ))}
            </div>
          ))
        ) : (
          <Message
            type="info"
            title="Oops, no hay preguntas"
            message="Agrega una pregunta"
          />
        )
      ) : (
        <Message
          type="error"
          title="Oops, no encontré ese quiz"
          message="Intenta con otro"
        />
      )}
    </div>
  );
};
