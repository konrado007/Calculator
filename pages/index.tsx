import Equal from "@/components/Equal";
import Number from "@/components/Number";
import Operation from "@/components/Operation";

export default function Home() {
  return (
    <div
      className="
      bg-[#bfc3ba]
      w-full h-screen flex items-center justify-center"
    >
      <div className="bg-[rgba(0,0,0,0.2)] rounded-lg overflow-hidden flex ">
        <div>
          <div className="text-end pb-2 pt-10 pr-2 font-bold text-[30px] bg-[#a9aca9]">
            0
          </div>
          <div className="grid grid-cols-4 grid-rows-6 gap-1">
            <Operation sign="%" />
            <Operation sign="CE" />
            <Operation sign="C" />
            <Operation sign="BACK" />
            <Operation sign="1/x" />
            <Operation sign="x^2" />
            <Operation sign="sqrt" />
            <Operation sign="/" />
            <Number number="7" />
            <Number number="8" />
            <Number number="9" />
            <Operation sign="x" />
            <Number number="4" />
            <Number number="5" />
            <Number number="6" />
            <Operation sign="-" />
            <Number number="1" />
            <Number number="2" />
            <Number number="3" />
            <Operation sign="+" />
            <Number number="+/-" />
            <Number number="0" />
            <Number number="," />
            <Equal />
          </div>
        </div>

        <div className="h-full w-[300px] p-4">
          <p className="font-semibold">History</p>
        </div>
      </div>
    </div>
  );
}
