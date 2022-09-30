import { AssessmentList } from "@/modules/assessments/components/assessmentList";
import { LoadingSpinner } from "@/shared/components/loadingSpinner";
import { Message } from "@/shared/components/message";
import { MainContainer } from "@/shared/layout/mainContainer";
import { Row } from "@/shared/layout/row";
import Button from "@mui/material/Button";
import { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { AssessmentsFilters } from "../components/assessmentsFilters";
import { useAssessments } from "../hooks/useAssessments";

interface ReducerState {
  categories: string[];
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
  }
  return state;
};

export const AllAssessments = () => {
  const { assessments: baseAssessments, loading, error } = useAssessments();

  const [assessments, setAssessments] = useState(baseAssessments);

  const [filters, dispatch] = useReducer(filterReducer, {
    categories: [],
  } as ReducerState);

  useEffect(() => {
    if (!baseAssessments) return setAssessments(baseAssessments);
    const filteredAssessments = baseAssessments.filter(
      (a) =>
        filters.categories.length == 0 ||
        a.categories.some((cat) => filters.categories.includes(cat))
    );

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
      <Row spacing={2} items="center">
        <h1 className="mb-8 grow">Quizes</h1>
        <NavLink to="new" className="mb-8">
          <Button variant="contained">Crear nuevo Quiz</Button>
        </NavLink>
      </Row>
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
