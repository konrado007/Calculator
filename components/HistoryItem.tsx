import { HistoryItemI } from "@/pages";
import React from "react";

const HistoryItem = ({
  first,
  operation,
  second,
  result,
  onClick,
}: HistoryItemI ) => {
  return (
    <div
      onClick={onClick}
      className="
            transition 
            duration-300 
            w-full 
            px-2 py-4 
            text-right 
            hover:bg-[rgba(0,0,0,0.1)]"
    >
      <p className="text-gray-200">
        {first + " " + operation + " " + second + " ="}
      </p>
      <h2 className="text-xl font-bold">{result}</h2>
    </div>
  );
};

export default HistoryItem;
