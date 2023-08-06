import React from "react";

interface NumberProps {
  onClick?: () => void;
  number: string;
}

const Number: React.FC<NumberProps> = ({ number }) => {
  return (
    <div
      onClick={() => {}}
      className="transition duration-300 px-6 py-5 bg-[#60495a] hover:bg-gray-400 flex items-center justify-center font-bold"
    >
      {number}
    </div>
  );
};

export default Number;
