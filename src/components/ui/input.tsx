import { cn } from "@/lib/utils";
import clsx from "clsx";
import React, { HTMLAttributes, forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeHolder?: string;
  disableInput?: boolean
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ title, placeHolder, className, disableInput, ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-green-200 hover:bg-secondary flex flex-col justify-center rounded-full cursor-pointer focus:shadow-sm",
          className
        )}
        {...props}
      >
        <div className="">{title}</div>
        <span className="w-full overflow-hidden">
          <input
            className={clsx(
              "focus:outline-none bg-transparent",
              disableInput ? "cursor-pointer pointer-events-none" : ""
            )}
            placeholder={placeHolder}
            ref={ref}
          />
        </span>
      </div>
    );
  }
);

export default Input;
