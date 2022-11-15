import React from 'react';
import { ErrorMessage } from '@/shared/components/errorMessage';
import { ChipRow } from '@/shared/components/chipRow';
import { Title } from '@/shared/components/title';
import { HandleAsyncData } from '@/shared/components/handleAsyncData';
import { useParams } from 'react-router-dom';
import { useAssessmentGrades, useGradedAssessment } from '@/modules/gradedAssessments/hooks/gradedAssessmentHooks';
import { GradedAssessmentsList } from '@/modules/gradedAssessments/components/gradedAssessmentsList';

export const AssessmentGrades = () => {
  const { id } = useParams();
  if (!id) return <ErrorMessage message="Missing assessment Id" />;
  const { gradedAssessments, error, loading } = useAssessmentGrades(id);

  return (
    <HandleAsyncData loading={loading} error={error}>
      {() => (
        <>
          <Title title="Historial" />
          <h2>Categorías</h2>
          <GradedAssessmentsList gradedAssessments={gradedAssessments} />
        </>
      )}
    </HandleAsyncData>
  );
};
