import Equal from "@/components/Equal";
import Number from "@/components/Number";
import Operation from "@/components/Operation";
import { calculator } from "@/constants/calculator";
import { useEffect, useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("0");
  const [operation, setOperation] = useState<string>("");
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [secondNumber, setSecondNumber] = useState<string>("");

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

  useEffect(() => {
    if (result.includes(".")) {
      setResult((prevResult) => {
        return prevResult.replace(".", ",");
      });
    }
  }, [result]);

  useEffect(() => {
    console.log(operation, result);
  }, [operation, result]);

  const calculateResult = (isEqual?: boolean) => {
    if (isEqual && result != "0") {
      setSecondNumber(result);
    } else if (secondNumber) {
      setSecondNumber("");
      setFirstNumber(result);
    }
    if (operation && (firstNumber != result || isEqual) && !secondNumber) {
      //calculate
      let res = null;

      const firstNumberFloat = parseFloat(firstNumber.replace(",", "."));
      const resultFloat = parseFloat(result.replace(",", "."));
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
          if (result != "0") res = firstNumberFloat / resultFloat;
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
      if (res != null) {
        !isEqual && setFirstNumber(res.toString());
        setResult(res.toString());
      }
    } else {
      setFirstNumber(result);
    }
  };

  const calculateWithOneNumber = (sign: string) => {
    if (result != "0") {
      if (secondNumber) {
        setOperation("");
        setSecondNumber("");
      }
      let res = null;
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
          <div className="grid grid-cols-4 grid-rows-6 gap-1">
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

        <div className="h-full w-[300px] p-4">
          <p className="font-semibold">History</p>
        </div>
      </div>
    </div>
  );
}
