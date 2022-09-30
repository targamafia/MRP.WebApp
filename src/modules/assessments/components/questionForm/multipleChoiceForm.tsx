import { Row } from "@/shared/layout/row";
import {
  AddOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import React, { useEffect, useReducer } from "react";
import { IOption } from "../../models";
import IconButton from "@mui/material/IconButton";

interface MultipleChoiceReducerAction {
  type: "change" | "add" | "remove";
  index?: number;
  item?: { isCorrectAnswer?: boolean; value?: string };
  value?: any;
}

const reducer = (state: IOption[], action: MultipleChoiceReducerAction) => {
  const newArray = state.slice();
  switch (action.type) {
    case "add":
      newArray.splice(newArray.length, 0, {
        value: "",
        isCorrectAnswer: false,
      });
      return newArray;
    case "remove":
      if (action.index === undefined) throw "Missing index";
      if (!confirm(`Estás a punto de quitar la ${action.index + 1} opción`))
        return state;
      newArray.splice(action.index, 1);
      return newArray;
    case "change":
      if (action.index === undefined) throw "Missing index";
      if (!action.item) throw "Missing item";
      return newArray.map((item, index) => {
        if (index !== action.index) {
          return {...item};
        }
        return {
          ...item,
          ...action.item,
        };
      });
  }
};

export const MultipleChoiceForm = (props: { setValue: Function }) => {
  const [state, dispatch] = useReducer(reducer, [] as IOption[]);

  const updateValue =
    (i: number, property: "isCorrect" | "value") =>
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "change",
        index: i,
        item:
          property == "isCorrect"
            ? { isCorrectAnswer: ev.currentTarget.checked }
            : { value: ev.currentTarget.value },
      });
    };

  useEffect(() => {
    props.setValue("options[]", state);
  }, [state]);

  return (
    <div className="mt-16">
      <>
        {state.map((option, i) => (
          <div key={i} className="mb-8">
            <hr className="mb-4" />
            <Row spacing={4} className="mb-4">
              <h4 className="grow w-6 text-2xl font-bold">Opción {i + 1}:</h4>
              <IconButton
                onClick={() => dispatch({ type: "remove", index: i })}
              >
                <CloseOutlined />
              </IconButton>
            </Row>
            <Row spacing={4} grow={true}>
              <div className="grow">
                <label htmlFor={`${i}-value`} className="mb-2 block">
                  Respuesta
                </label>
                <input
                  id={`${i}-value`}
                  type="text"
                  onChange={updateValue(i, "value")}
                  value={option.value}
                  className="grow w-full"
                  autoComplete="none"
                />
              </div>
              <div>
                <label htmlFor={`${i}-isCorrect`} className="block">
                  Es Correcta
                </label>
                <input
                  id={`${i}-isCorrect`}
                  type="checkbox"
                  onChange={updateValue(i, "isCorrect")}
                  defaultChecked={option.isCorrectAnswer}
                />
              </div>
            </Row>
          </div>
        ))}
        <IconButton
          onClick={() => dispatch({ type: "add" })}
          className="!mx-auto !block"
        >
          <AddOutlined />
        </IconButton>
      </>
    </div>
  );
};
