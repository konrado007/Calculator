import React from "react";
import { BsBackspaceFill } from "react-icons/bs";

interface NumberProps {
  onClick?: () => void;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
  setFirstNumber: React.Dispatch<React.SetStateAction<string>>;
  setSecondNumber: React.Dispatch<React.SetStateAction<string>>;
  calculateResult: () => void;
  calculateWithOneNumber: (sign: string) => void;
  result: string;
  sign: string;
  secondNumber: string;
}

const Operation: React.FC<NumberProps> = ({
  sign,
  setResult,
  setOperation,
  setFirstNumber,
  setSecondNumber,
  result,
  calculateResult,
  secondNumber,
  calculateWithOneNumber,
}) => {
  const updateResult = () => {
    if (sign == "CE") {
      setResult("0");
      if (secondNumber) {
        setFirstNumber("");
        setOperation("");
        setSecondNumber("");
      }
    } else if (sign == "C") {
      setResult("0");
      setFirstNumber("");
      setOperation("");
      setSecondNumber("");
    } else if (sign == "BACK") {
      if (result.length == 1 || (result.length == 2 && result[0] == "-")) {
        setResult("0");
      } else {
        setResult((prevResult) => {
          return prevResult.slice(0, prevResult.length - 1);
        });
      }
    } else if (sign == "1/x" || sign == "x^2" || sign == "sqrt") {
      calculateWithOneNumber(sign);
    } else {
      setOperation(sign);
      calculateResult();
    }
  };
  return (
    <div
      onClick={updateResult}
      className="
        font-semibold 
        transition duration-300  
        px-6 py-5 
        bg-[#3f3244] 
        hover:bg-gray-400 
        flex 
        items-center 
        justify-center"
    >
      {sign == "sqrt" ? (
        <div className="relative">
          <span className="absolute left-0 -top-[3px] text-[10px]">2</span>√x
        </div>
      ) : sign == "x^2" ? (
        <div className="relative">
          <span className="absolute -right-[5px] -top-[3px] text-[10px]">
            2
          </span>
          x
        </div>
      ) : sign == "BACK" ? (
        <div className="relative">
          <BsBackspaceFill />
        </div>
      ) : (
        sign
      )}
    </div>
  );
};

export default Operation;
