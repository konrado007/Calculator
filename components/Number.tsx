import React from "react";

interface NumberProps {
  onClick?: () => void;
  number: number | string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  operation: string;
  firstNumber: string;
  secondNumber: string;
  restart: () => void;
}

const Number: React.FC<NumberProps> = ({
  number,
  setResult,
  result,
  operation,
  firstNumber,
  secondNumber,
  restart,
}) => {
  const updateResult = () => {
    if (secondNumber) {
      // it means that there is full equation and we want to restart all states
      restart();
    }
    if (result == "Cannot divide by zero") setResult("");

    const stringNumber = number.toString();
    if (stringNumber == "," && !result.includes(",")) {
      //make sure to add comma only once
      setResult((prevRes) => prevRes + ",");
    } else if (
      (stringNumber != "," && result == "0" && stringNumber != "+/-") ||
      (operation && result == firstNumber)
    ) {
      setResult(stringNumber);
    } else if (stringNumber == "+/-") {
      if (result != "0") {
        setResult((prevRes) => {
          if (prevRes[0] != "-") {
            return "-" + prevRes;
          } else {
            return prevRes.slice(1);
          }
        });
      }
    } else if (typeof number == "number") {
      //add normally only if it number between 0-9
      setResult((prevRes) => prevRes + number);
    }
  };

  return (
    <div
      onClick={updateResult}
      className="w-[88px] transition duration-300 px-6 py-5 bg-[#60495a] hover:bg-gray-400 flex items-center justify-center font-bold"
    >
      {number}
    </div>
  );
};

export default Number;
