import React from "react";

interface NumberProps {
  onClick?: () => void;
  sign: string;
}

const Operation: React.FC<NumberProps> = ({ sign }) => {
  return (
    <div className="font-semibold transition duration-300  px-6 py-5 bg-[#3f3244] hover:bg-gray-400 flex items-center justify-center">
      {sign}
    </div>
  );
};

export default Operation;
