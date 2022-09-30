import { MultiselectFilter } from "@/shared/components/multiselectFilter";
import { useEffect, useReducer, useState } from "react";
import { IAssessment } from "../models";

export const AssessmentsFilters = (props: {
  assessments: IAssessment[];
  dispatch: Function;
  state: { categories: string[] };
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  const updateFilters = () => {
    const categories: string[] = [];
    props.assessments
      .flatMap((cat: IAssessment) => cat.categories)
      .forEach((cat: string) => {
        if (categories.includes(cat)) return;
        categories.push(cat);
      }, [] as string[]);
    setCategories(categories);
  };

  useEffect(() => {
    updateFilters();
  }, [props.assessments]);

  return (
    <div className="max-w-xs rounded-md">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <MultiselectFilter
        allOptions={categories}
        selectedOptions={props.state.categories}
        onChange={(value: string) =>
          props.dispatch({ property: "categories", value })
        }
      />
    </div>
  );
};
