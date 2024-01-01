import React, { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ICount } from "./guestContent";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title: keyof ICount;
  desc: string;
  count: ICount;
  disabled?: boolean;
  setCount: React.Dispatch<React.SetStateAction<ICount>>;
}

const InputCount = ({ title, desc, className, count, setCount, disabled }: IProps) => {
  return (
    <div className={cn("flex justify-between px-5 items-center", className)}>
      <div>
        <div className="text-base font-semibold capitalize">{title}</div>
        <div className="text-sm text-gray-400">{desc}</div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          onClick={() =>
            setCount((prev: any) => ({
              ...prev,
              [title]: prev[title] == 0 ? prev[title] : prev[title] - 1,
            }))
          }
          disabled={count[title] == 0 || disabled}
        >
          -
        </Button>
        <div className="w-[10px]">{count[title]}</div>
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          onClick={() =>
            setCount((prev: any) => ({
              ...prev,
              [title]: prev[title] + 1,
            }))
          }
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default InputCount;
