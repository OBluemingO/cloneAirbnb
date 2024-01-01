import { useMemo, useState } from "react"
import ButtonRound from "../buttons/buttonRound"
import { cn } from "@/lib/utils"
import RangeDatePicker from "./RangeDatePicker"

interface ICheckInComponentProps {
  isOpen: boolean
}

type TMenu = "Dates" | "Months" | "Flexible"

const DatePickCheckInContent = ({ isOpen }: ICheckInComponentProps) => {
  const [menu, setMenu] = useState<TMenu>('Dates')

  const groupButton = useMemo(() => {
    return ['Dates', 'Months', 'Flexible']
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const current = (e.target as HTMLDivElement).innerText as TMenu
    setMenu(current)
  }

  if (!isOpen) return <></>;

  return (
    <div className="flex flex-col items-center h-full">
      <ButtonRound className="max-h-none px-2 w-fit border-none bg-gray-200">
        {groupButton.map((item, index) => (
          <ButtonRound 
            className={cn(
              "border-none bg-transparent cursor-pointer",
              menu === item ? "bg-white" : ""
            )}
            onClick={handleClick}
            key={'group-button-checkin-range-date-picker-' + index}
          >
            {item}
          </ButtonRound>
        ))}
      </ButtonRound>
      <RangeDatePicker isOpen={menu == "Dates"} />
    </div>
  );
}

export default DatePickCheckInContent