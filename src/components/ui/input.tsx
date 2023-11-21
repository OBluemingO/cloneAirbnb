import { cn } from "@/lib/utils";
import clsx from "clsx";
import React, { ForwardedRef, HTMLAttributes, forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  placeHolder?: string;
  disableInput?: boolean
  placeHolderAlign?: 'left' | 'center' | 'right'
}

interface IInputHandle {
  focus(): void
}

const Input = forwardRef(
  ({ title, placeHolder, className, disableInput, placeHolderAlign = 'left', ...props }: Props, ref: ForwardedRef<IInputHandle>) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle<IInputHandle, IInputHandle>(ref, () => ({
      focus() {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }), []);

    return (
      <div
        className={cn(
          "hover:bg-secondary flex flex-col justify-center rounded-full cursor-pointer focus:shadow-sm",
          className
        )}
        {...props}
      >
        <div className="">{title}</div>
        <div className="">
          {/* {placeHolder} */}
          <input
            className={clsx(
              `focus:outline-none bg-transparent w-full text-${placeHolderAlign}`,
              disableInput ? "cursor-pointer pointer-events-none" : ""
            )}
            placeholder={placeHolder}
            ref={inputRef}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = '';

export default Input;
