import React from "react";

interface NumberProps {
  onClick?: () => void;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  sign: string;
}

const Operation: React.FC<NumberProps> = ({ sign, setResult, result }) => {
  const updateResult = () => {
    if (sign == "CE" || sign == "C") {
      setResult("0");
    } else if (sign == "BACK") {
      if (result.length == 1 || (result.length == 2 && result[0] == "-")) {
        setResult("0");
      } else {
        setResult((prevResult) => {
          return prevResult.slice(0, prevResult.length - 1);
        });
      }
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
