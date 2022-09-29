import { ArrowForwardIosOutlined } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import { IAssessment } from "../models";

export const AssessmentCard = (props: IAssessment & { key?: any }) => {
  return (
    <NavLink to={`/assessments/${props.id}`}>
      <div
        className="p-4 rounded-md bg-surfaces-dark-4 text-white
      hover:bg-surfaces-dark-5 transition-colors duration-300"
      >
        <div className="flex flex-row items-center gap-4">
          <div className="grow">
            <h3>{props.title}</h3>
            {props.description !== undefined && <p>{props.description}</p>}
          </div>
          <ArrowForwardIosOutlined color="info" />
        </div>
      </div>
    </NavLink>
  );
};
