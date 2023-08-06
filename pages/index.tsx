import Equal from "@/components/Equal";
import Number from "@/components/Number";
import Operation from "@/components/Operation";
import { calculator } from "@/constants/calculator";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("0");

  const formatResult = (result: string): string => {
    if (result.includes(",")) {
      const valueAfterComma = result.slice(
        result.indexOf(",") + 1,
        result.length
      );

      const valueBeforeComma = result
        .slice(0, result.indexOf(",") + 1)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      return valueBeforeComma + valueAfterComma;
    }

    return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div
      className="
      bg-[#bfc3ba]
      w-full h-screen flex items-center justify-center"
    >
      <div className="bg-[rgba(0,0,0,0.2)] rounded-lg overflow-hidden flex ">
        <div>
          <div className="text-end pb-2 pt-10 pr-2 font-bold text-[30px] bg-[#a9aca9]">
            {formatResult(result)}
          </div>
          <div className="grid grid-cols-4 grid-rows-6 gap-1">
            {calculator.map((item: string | number, index: number) => {
              if (item == "=") {
                return <Equal key={index} />;
              } else if (
                typeof item == "number" ||
                item == "+/-" ||
                item == ","
              ) {
                return (
                  <Number
                    key={index}
                    number={item}
                    setResult={setResult}
                    result={result}
                  />
                );
              }
              return (
                <Operation
                  sign={item}
                  key={index}
                  result={result}
                  setResult={setResult}
                />
              );
            })}
          </div>
        </div>

        <div className="h-full w-[300px] p-4">
          <p className="font-semibold">History</p>
        </div>
      </div>
    </div>
  );
}
