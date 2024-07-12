import React from "react";
import "./Button.css";

const Button = ({ className, value, onButtonClick }) => {
  return (
    <button className={className} onClick={onButtonClick}>
      {value}
    </button>
  );
};

export default Button;
