import { MultiselectFilter } from '@/shared/components/multiselectFilter';
import { SearchOutlined } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { IAssessment } from '../../models';

export const AssessmentsFilters = (props: {
  assessments: IAssessment[];
  dispatch: Function;
  state: { categories: string[] };
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  const updateCategoryFilters = () => {
    if (!props.assessments) return setCategories([]);
    const categories: string[] = [];
    for (var i = 0; i < props.assessments.length; i++) {
      const assessment = props.assessments[i];
      for (var x = 0; x < assessment.categories.length; x++) {
        const category = assessment.categories[x];
        if (categories.includes(category)) continue;
        categories.push(category);
      }
    }
    setCategories(categories);
  };

  useMemo(() => {
    updateCategoryFilters();
  }, [props.assessments]);

  return (
    <div className="max-w-xs rounded-md">
      <h2 className="mb-2">Filtros</h2>
      <div className="flex flex-row gap-4 items-center relative my-4">
        <h3 className="mt-4 hidden" aria-hidden>
          Buscar
        </h3>
        <input
          type="text"
          id="query"
          placeholder="Buscar"
          autoComplete="off"
          aria-label="Buscar"
          className="outline outline-neutral-70 w-full mt-2 placeholder:text-neutral-50 pl-10"
          onChange={(ev) =>
            props.dispatch({ property: 'query', value: ev.currentTarget.value })
          }
        />
        <SearchOutlined className="absolute left-2 mt-1 top-1/2 -translate-y-1/2" />
      </div>
      <h3 className="mt-4">Categorías</h3>
      <MultiselectFilter
        allOptions={categories}
        selectedOptions={props.state.categories}
        onChange={(value: string) =>
          props.dispatch({ property: 'categories', value })
        }
      />
    </div>
  );
};
