import { AssessmentList } from '@/modules/assessments/components/assessmentList/assessmentList';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Message } from '@/shared/components/message';
import { Title } from '@/shared/components/title';
import { MainContainer } from '@/shared/layout/mainContainer';
import Button from '@mui/material/Button';
import { useMemo, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import { AssessmentsFilters } from '../components/assessmentList/assessmentsFilters';
import { useAssessments } from '../hooks/useAssessments';

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
    case 'categories':
      if (!state.categories.includes(action.value))
        return { ...state, categories: [action.value, ...state.categories] };
      return {
        ...state,
        categories: state.categories.filter((v) => v != action.value),
      };
    case 'query':
      return { ...state, query: action.value };
    default:
      console.error('Unkown action property');
      return { ...state };
  }
};

export const AllAssessments = () => {
  const { assessments: baseAssessments, loading, error } = useAssessments();

  const [filters, dispatch] = useReducer(filterReducer, {
    categories: [],
    query: '',
  } as ReducerState);

  const assessments = useMemo(() => {
    if (!baseAssessments) return [];
    const queryEnabled = filters.query != '',
      categoriesEnabled = filters.categories.length > 0,
      queryRegex = new RegExp(filters.query, 'ig');
    return baseAssessments.filter(
      (assessment) =>
        (!categoriesEnabled ||
          assessment.categories.some((category) =>
            filters.categories.includes(category)
          )) &&
        (!queryEnabled ||
          [
            assessment.title,
            assessment.categories.join(' '),
            assessment.description,
          ].some((i) => i !== undefined && queryRegex.test(i)))
    );
  }, [baseAssessments, filters.categories, filters.query]);

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
          <NavLink
            to="new"
            className="block bg-blue px-4
          py-2 rounded-md text-white hover:bg-primary-40"
          >
            Crear nuevo Examen
          </NavLink>
        }
        title="Exámenes"
      />
      <HandleAsyncData loading={loading} error={error}>
        {() => <AssessmentList assessments={assessments} />}
      </HandleAsyncData>
    </MainContainer>
  );
};
