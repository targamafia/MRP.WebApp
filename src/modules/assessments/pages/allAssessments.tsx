import { AssessmentList } from "@/modules/assessments/components/assessmentList/assessmentList";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { Message } from "@/shared/components/message";
import { Title } from "@/shared/components/title";
import { MainContainer } from "@/shared/layout/mainContainer";
import { Row } from "@/shared/layout/row";
import Button from "@mui/material/Button";
import { useMemo, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { AssessmentsFilters } from "../components/assessmentList/assessmentsFilters";
import { useAssessments } from "../hooks/useAssessments";
import { IAssessment } from "../models";

interface ReducerState {
  categories: string[];
  query: string;
}

interface ReducerAction {
  property: string;
  value: any;
}

const filterReducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.property) {
    case "categories":
      if (!state.categories.includes(action.value))
        return { ...state, categories: [action.value, ...state.categories] };
      return {
        ...state,
        categories: state.categories.filter((v) => v != action.value),
      };
    case "query":
      return { ...state, query: action.value };
    default:
      console.error("Unkown action property");
      return { ...state };
  }
};

export const AllAssessments = () => {
  const { assessments: baseAssessments, loading, error } = useAssessments();

  const [assessments, setAssessments] = useState(baseAssessments);

  const [filters, dispatch] = useReducer(filterReducer, {
    categories: [],
    query: "",
  } as ReducerState);

  useMemo(() => {
    if (!baseAssessments) return setAssessments(baseAssessments);
    let filteredAssessments: IAssessment[] = baseAssessments;
    if (filters.categories.length > 0) {
      filteredAssessments = filteredAssessments.filter(
        (a) =>
          filters.categories.length == 0 ||
          a.categories.some((cat) => filters.categories.includes(cat))
      );
    }
    if (filters.query != "") {
      const queryRegex = new RegExp(filters.query, "ig");
      filteredAssessments = filteredAssessments.filter((a) =>
        [a.title, a.categories.join(" "), a.description].some(
          (i) => i !== undefined && queryRegex.test(i)
        )
      );
    }

    setAssessments(filteredAssessments);
  }, [baseAssessments, filters]);

  return (
    <MainContainer
      sidebar={
        <AssessmentsFilters
          assessments={baseAssessments}
          state={filters}
          dispatch={dispatch}
        />
      }
    >
      <Title
        cta={
          <NavLink to="new" className="block">
            <Button variant="contained">Crear nuevo Quiz</Button>
          </NavLink>
        }
        title="Quizes"
      />
      {loading ? <LoadingSpinner /> : <></>}
      {!!error ? (
        <Message type="error" title="Error" message={error.toString()} />
      ) : (
        <></>
      )}
      {!loading && !error ? (
        <AssessmentList assessments={assessments} />
      ) : (
        <></>
      )}
    </MainContainer>
  );
};
