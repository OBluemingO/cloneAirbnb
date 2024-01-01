import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
import { cn, getCurrentDate } from "@/lib/utils";
import ButtonRound from "../buttons/buttonRound";
import { TbPlusMinus } from "react-icons/tb";

interface Props {
  isOpen: boolean;
}

const Footer = () => {
  const [exactDates, setExactDates] = useState<number>(0)
  return (
    <footer className="absolute bottom-0 left-0 px-7 w-full flex gap-2">
      {Array.from({ length: 5 }, (_, idx) => (idx == 4 ? 7 : idx)).map(
        (item, index) => (
          <ButtonRound
            className={cn(
              "max-h-[32px] py-1 px-3 text-xs cursor-pointer w-auto gap-1",
              exactDates == item ? "border-black" : "border-gray-200"
            )}
            key={`button-${index}-checkin-${item}`}
            onClick={() => setExactDates(item)}
          >
            <div className="grid place-items-center">
              {item != 0 ? <TbPlusMinus /> : <></>}
            </div>
            {item == 0 ? "Exact dates" : `${item} days`}
          </ButtonRound>
        )
      )}
    </footer>
  );
}

const RangeDatePicker = ({ isOpen }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  if (!isOpen) return <></>;

  return (
    <div className="w-full h-full relative">
      <Calendar
        className="w-full h-auto pt-6"
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        fromMonth={getCurrentDate("month")}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        showOutsideDays={false}
      />
      <Footer />
    </div>
  );
};

export default RangeDatePicker;
