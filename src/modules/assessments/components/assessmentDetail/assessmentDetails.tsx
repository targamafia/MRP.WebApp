import { useAssessment } from '../../hooks/useAssessments';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { ChipRow } from '@/shared/components/chipRow';
import { Title } from '@/shared/components/title';
import { AssessmentSmallCard } from '../assessmentList/assessmentSmallCard';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';

export const AssessmentDetails = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;
  const { assessment, error, loading } = useAssessment(id);

  return (
    <HandleAsyncData loading={loading} error={error}>
      {() => (
        <>
          <Title title="Detalles" />
          <h2>Categorías</h2>
          {assessment!.categories !== undefined && (
            <ChipRow elements={assessment!.categories} />
          )}
          <hr className="my-4" />
          <h2 className="mb-2">Descripción</h2>
          <p className="mb-8">
            {assessment!.description !== undefined
              ? assessment!.description
              : 'Sin descripción'}
          </p>
          <hr className="my-4" />
          <h2 className="mb-4">Vista Previa</h2>
          <div className="p-8 rounded-md bg-surface-2 pointer-events-none">
            <AssessmentSmallCard assessment={assessment!} />
          </div>
        </>
      )}
    </HandleAsyncData>
  );
};
