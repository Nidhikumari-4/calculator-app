import React from "react";
import "./CalculatorBox.css";

const CalculatorBox = ({ children }) => {
  return <div className="calculatorBox">{children}</div>;
};

export default CalculatorBox;
