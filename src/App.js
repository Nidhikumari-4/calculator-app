import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import ResultArea from "./components/ResultArea";
import CalculatorBox from "./components/CalculatorBox";
import Button from "./components/Button";

const valuesOfButtons = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const math = (num1, num2, operator) =>
  operator === "+"
    ? num1 + num2
    : operator === "-"
    ? num1 - num2
    : operator === "X"
    ? num1 * num2
    : num1 / num2;

const zeroDivisionError = "Not Possible";

const removeSpaces = (number) => number.toString().replace(/\s/g, "");

const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const App = () => {
  let [calculator, setCalculator] = useState({
    operator: "",
    number: 0,
    result: 0,
  });

  const numberClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calculator.number).length < 16) {
      setCalculator({
        ...calculator,
        number:
          removeSpaces(calculator.number) % 1 === 0 &&
          !calculator.number.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calculator.number + value)))
            : toLocaleString(calculator.number + value),
        result: !calculator.operator ? 0 : calculator.result,
      });
    }
  };

  const commaClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalculator({
      ...calculator,
      number: !calculator.number.toString().includes(".")
        ? calculator.number + value
        : calculator.number,
    });
  };

  const operatorClick = (e) => {
    setCalculator({
      ...calculator,
      operator: e.target.innerHTML,
      result: !calculator.number
        ? calculator.result
        : !calculator.result
        ? calculator.number
        : toLocaleString(
            math(
              Number(removeSpaces(calculator.result)),
              Number(removeSpaces(calculator.number)),
              calculator.operator
            )
          ),
      number: 0,
    });
  };

  const equalsClick = () => {
    if (calculator.operator && calculator.number) {
      setCalculator({
        ...calculator,
        result:
          calculator.number === "0" && calculator.operator === "/"
            ? zeroDivisionError
            : toLocaleString(
                math(
                  Number(removeSpaces(calculator.result)),
                  Number(removeSpaces(calculator.number)),
                  calculator.operator
                )
              ),
        operator: "",
        number: 0,
      });
    }
  };

  const invertClick = () => {
    setCalculator({
      ...calculator,
      number: calculator.number
        ? toLocaleString(removeSpaces(calculator.number) * -1)
        : 0,
      result: calculator.result
        ? toLocaleString(removeSpaces(calculator.result) * -1)
        : 0,
      operator: "",
    });
  };

  const percentageClick = () => {
    let number = calculator.number
      ? parseFloat(removeSpaces(calculator.number))
      : 0;
    let result = calculator.result
      ? parseFloat(removeSpaces(calculator.result))
      : 0;
    setCalculator({
      ...calculator,
      number: (number * 10 ** 16) / 10 ** 18,
      result: (result * 10 ** 16) / 10 ** 18,
      operator: "",
    });
  };

  const resetClick = () => {
    setCalculator({
      ...calculator,
      operator: "",
      number: 0,
      result: 0,
    });
  };

  const buttonClick = (e, button) => {
    button === "C" || calculator.result === zeroDivisionError
      ? resetClick()
      : button === "+-"
      ? invertClick()
      : button === "%"
      ? percentageClick()
      : button === "="
      ? equalsClick()
      : button === "/" || button === "X" || button === "-" || button === "+"
      ? operatorClick(e)
      : button === "."
      ? commaClick(e)
      : numberClick(e);
  };

  return (
    <Wrapper>
      <ResultArea
        value={calculator.number ? calculator.number : calculator.result}
      />
      <CalculatorBox>
        {valuesOfButtons.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onButtonClick={(e) => buttonClick(e, btn)}
            />
          );
        })}
      </CalculatorBox>
    </Wrapper>
  );
};

export default App;
