import React from "react";

interface NumberProps {
  onClick?: () => void;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setOperation: React.Dispatch<React.SetStateAction<string>>;
  setFirstNumber: React.Dispatch<React.SetStateAction<string>>;
  setSecondNumber: React.Dispatch<React.SetStateAction<string>>;
  calculateResult: () => void;
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
    } else {
      calculateResult();
      setOperation(sign);
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
      {sign}
    </div>
  );
};

export default Operation;
