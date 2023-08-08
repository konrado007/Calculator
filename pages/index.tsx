import Equal from "@/components/Equal";
import HistoryItem from "@/components/HistoryItem";
import Number from "@/components/Number";
import Operation from "@/components/Operation";
import { calculator } from "@/constants/calculator";
import { generateUniqueId } from "@/lib/generateUniqueId";
import { useEffect, useState } from "react";

export interface HistoryItemI {
  id: string;
  first: string;
  operation: string;
  second: string;
  result: string;
  onClick?: () => void;
}
export default function Home() {
  const [result, setResult] = useState<string>("0");
  const [operation, setOperation] = useState<string>("");
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [secondNumber, setSecondNumber] = useState<string>("");
  const [history, setHistory] = useState<HistoryItemI[] | []>([]);

  const formatResult = (result: string): string => {
    // formating result to format 000 000 only before comma
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

  useEffect(() => {
    if (result.includes(".")) {
      setResult((prevResult) => {
        return prevResult.replace(".", ",");
      });
    } // replacing . with , because making operations in default there is a .
  }, [result]);

  const calculateResult = (isEqual?: boolean) => {
    if (isEqual && result !== "0" && operation) {
      setSecondNumber(result); //when equal button pressed result changed and there is operation
    } else if (secondNumber && !isEqual) {
      //when going further with operations without clickcing equal button
      setSecondNumber("");
      setFirstNumber(result);
    } else if (!operation && isEqual) {
      //when user click number and press equals without any operation, it displays (10=) because, second number is set to " "
      setSecondNumber(" ");
    }

    if (operation && (firstNumber !== result || isEqual) && !secondNumber) {
      //calculate
      let res = 0;

      const firstNumberFloat = parseFloat(firstNumber.replace(",", ".")); //parsing string to float
      const resultFloat = parseFloat(result.replace(",", ".")); //parsing string to float

      switch (operation) {
        case "+":
          res = firstNumberFloat + resultFloat;
          break;
        case "-":
          res = firstNumberFloat - resultFloat;
          break;
        case "x":
          res = firstNumberFloat * resultFloat;
          break;
        case "/":
          if (result !== "0") res = firstNumberFloat / resultFloat;
          else {
            setResult("Cannot divide by zero");
            return;
          }
          break;
        case "%":
          res = (firstNumberFloat / 100) * resultFloat;
          break;
        default:
          break;
      }

      if (res !== null) {
        setHistory((prevHistory) => [
          {
            id: generateUniqueId(),
            first: firstNumber,
            operation,
            second: result,
            result: res.toString(),
          },
          ...prevHistory,
        ]);

        !isEqual && setFirstNumber(res.toString());
        setResult(res.toString());
      }
    } else if (result != "0") {
      setFirstNumber(result);
    }
  };

  const calculateWithOneNumber = (sign: string) => {
    if (result != "0") {
      if (secondNumber || operation) {
        setOperation("");
        setSecondNumber("");
      }
      let res = 0;
      let front = "",
        back = "";
      const resultFloat = parseFloat(result.replace(",", "."));
      switch (sign) {
        case "1/x":
          res = 1 / resultFloat;
          front = "1/(";
          back = ")";
          break;
        case "x^2":
          res = resultFloat ** 2;
          front = "sqr(";
          back = ")";
          break;
        case "sqrt":
          res = Math.sqrt(resultFloat);
          front = "√(";
          back = ")";
          break;
        default:
          break;
      }
      if (res != null) {
        setHistory((prevHistory) => [
          {
            id: generateUniqueId(),
            first: front + result + back,
            operation: "",
            second: "",
            result: res.toString(),
          },
          ...prevHistory,
        ]);

        setFirstNumber(front + result + back);
        setResult(res.toString());
      }
    }
  };

  return (
    <div
      className="
      bg-[#bfc3ba]
      w-full h-screen flex items-center justify-center"
    >
      <div className="bg-[rgba(0,0,0,0.2)] rounded-lg overflow-hidden flex ">
        <div>
          <div
            className={`text-end pb-2 ${
              firstNumber ? "pt-5" : "pt-10"
            } pr-2 font-bold text-[30px] bg-[#a9aca9]`}
          >
            <h3 className="text-sm">
              {secondNumber
                ? firstNumber + ` ${operation} ` + `${secondNumber} = `
                : firstNumber + ` ${operation}`}
            </h3>
            <h2 className="w-full">{formatResult(result)}</h2>
          </div>
          <div className="grid grid-cols-4 grid-rows-6 gap-1 ">
            {calculator.map((item: string | number, index: number) => {
              if (item == "=") {
                return <Equal key={index} calculate={calculateResult} />;
              } else if (
                typeof item == "number" ||
                item == "+/-" ||
                item == ","
              ) {
                return (
                  <Number
                    key={index}
                    number={item}
                    operation={operation}
                    setResult={setResult}
                    result={result}
                    firstNumber={firstNumber}
                    secondNumber={secondNumber}
                    restart={() => {
                      setFirstNumber("");
                      setOperation("");
                      setResult("");
                      setSecondNumber("");
                    }}
                  />
                );
              }
              return (
                <Operation
                  sign={item}
                  key={index}
                  result={result}
                  setResult={setResult}
                  setFirstNumber={setFirstNumber}
                  setOperation={setOperation}
                  setSecondNumber={setSecondNumber}
                  calculateResult={calculateResult}
                  calculateWithOneNumber={calculateWithOneNumber}
                  secondNumber={secondNumber}
                />
              );
            })}
          </div>
        </div>

        <div className="h-full w-[300px] ">
          <div className="flex justify-between p-4">
            <p className="font-semibold">History</p>
            <p
              className="font-semibold"
              onClick={() => {
                setHistory([]);
              }}
            >
              Clear history
            </p>
          </div>

          <div className="flex flex-col overflow-y-scroll no-scrollbar h-fit max-h-[420px]">
            {history?.map((historyItem: HistoryItemI) => {
              return (
                <HistoryItem
                  {...historyItem}
                  key={historyItem.id}
                  onClick={() => {
                    setFirstNumber(historyItem.first);
                    setOperation(historyItem.operation);
                    setSecondNumber(historyItem.second);
                    setResult(historyItem.result);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
