import { ErrorMessage } from '@/shared/components/errorMessage';
import { LoadingSpinner } from '@/shared/components/loadingSpinner';
import { Row } from '@/shared/layout/row';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { NavLink } from 'react-router-dom';
import { useFeaturedAssessments } from '../../hooks/useAssessments';
import { AssessmentSmallCard } from './assessmentSmallCard';

export const FeaturedAssessments = () => {
  const { assessments, loading, error } = useFeaturedAssessments();
  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <ErrorMessage message={error.toString()} />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {assessments.length > 0 ? (
        <>
          {assessments.slice(0, 5).map((assessment) => (
            <AssessmentSmallCard {...assessment} key={assessment.id} />
          ))}
          <NavLink
            to='/assessments'
            className="rounded-md flex flex-col relative
            text-center bg-blue text-white justify-center
            hover:shadow-glow py-4 hover:scale-105 transition-all
            hover:bg-primary-40"
          >
            <Row spacing={2} justify="center">
              <h2 className="mb-0">Ver más</h2>
              <ArrowForwardIos />
            </Row>
          </NavLink>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
