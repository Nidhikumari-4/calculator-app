import React from "react";
import { Textfit } from "react-textfit";
import "./ResultArea.css";

const ResultArea = ({ value }) => {
  return (
    <Textfit className="resultScreen" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default ResultArea;
