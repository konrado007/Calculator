import React from "react";

interface EqualProps {
  calculate: () => void;
}

const Equal: React.FC<EqualProps> = ({ calculate }) => {
  return (
    <div
      className="font-semibold text-lg px-6 py-3 bg-[#2f2235] hover:bg-[#261c2b] flex items-center justify-center"
      onClick={calculate.bind(true)}
    >
      =
    </div>
  );
};

export default Equal;
