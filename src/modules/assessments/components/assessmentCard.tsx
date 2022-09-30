import { ArrowForwardIosOutlined } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import { IAssessment } from "../models";
import Chip from "@mui/material/Chip";

export const AssessmentCard = (props: IAssessment & { key?: any }) => {
  return (
    <NavLink to={`/assessments/${props.id}`}>
      <div
        className="rounded-md bg-surface-4 text-main
      hover:bg-surface-5 transition-colors duration-300
      overflow-hidden shadow-sm outline outline-solid outline-surface-2
      hover:outline-white hover:shadow-glow
      "
      >
        <div className="flex flex-row items-center pr-4">
          {props.thumbnailUrl !== undefined && (
            <img
              src={props.thumbnailUrl}
              className="w-1/5 max-w-xs self-stretch object-cover"
            />
          )}
          <div className="grow p-4 flex items-start self-start flex-col">
            {props.categories !== undefined && (
              <div className="flex gap-4 mb-4">
                {props.categories.map((cat) => (
                  <Chip
                    label={cat}
                    variant="filled"
                    color="primary"
                    key={cat}
                  />
                ))}
              </div>
            )}
            <h3 className="text-3xl mb-2">{props.title}</h3>
            {props.description !== undefined && (
              <p className="mb-4">{props.description}</p>
            )}
          </div>
          <ArrowForwardIosOutlined color="info" />
        </div>
      </div>
    </NavLink>
  );
};
