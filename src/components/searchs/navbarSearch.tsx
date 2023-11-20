'use client'
import React, { useEffect, useRef, useState, createRef, RefObject, MutableRefObject } from 'react'
import ButtonRound from '../buttons/buttonRound'
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion'
import { navbarSearchAnimate } from './animate'
import clsx from 'clsx';
import { cn } from '@/lib/utils';
import Input from '../ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

interface IShowAddionalState {
  status: boolean
  current: string
}

interface IProps extends Partial<HTMLDivElement> {}

const NavbarSearch = ({className, ...props}: IProps) => {
  const [showAddtionalMenu, setShowAddtionalMenu] = useState<IShowAddionalState>({
    status: false,
    current: ''
  })
  const ref = useRef<HTMLDivElement>()
  const refInput = useRef<HTMLInputElement[]>() as MutableRefObject<HTMLInputElement[]>
  // const refInput = useRef(Array.from({length: 4}, a => a as RefObject<HTMLInputElement>))
  const buttonRef = useRef<HTMLButtonElement[]>([])

  useEffect(() => {
    document.documentElement.style.overflowY = showAddtionalMenu.status ? 'hidden' : 'auto'
  }, [showAddtionalMenu])

  // useEffect(() => {
    // if (showAddtionalMenu.current === '') {
    //   for (let i = 0; i <= buttonRef.current.length - 1; i++) {
    //     buttonRef.current[i].style.backgroundColor = 'white'
    //   }
    //   return
    // }

    // const Buttons = buttonRef.current.map((el: HTMLButtonElement | null) => {
    //   if(!el) return el
    //   return el.innerText
    // })
    // const indentButton = Buttons.findIndex((el: string | null) => (el == showAddtionalMenu.current))

    // if(indentButton == -1 && buttonRef.current.length == 0) return

    // for (let i = 0; i <= buttonRef.current.length - 1; i++) {
    //   if(indentButton == i) {
    //     buttonRef.current[indentButton].style.backgroundColor = 'black'
    //     buttonRef.current[indentButton].style.padding = '20px'
    //     buttonRef.current[indentButton].style.color = 'white'
    //   }
    //   else {
    //     buttonRef.current[i].style.backgroundColor = 'white'
    //     buttonRef.current[i].style.padding = '0px'
    //     buttonRef.current[i].style.color = 'black'
    //   }
    // }
  // }, [showAddtionalMenu.current])

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const current = (e.target as HTMLDivElement).innerText
    setShowAddtionalMenu({
      current,
      status: true,
    })

  }

  return (
    <>
      <motion.div className={cn(className)}>
        <ButtonRound
          className={clsx(
            "justify-between flex transition-all overflow-hidden px-2"
          )}
          ref={ref}
        >
          <div
            className={clsx(
              "justify-between transition-all overflow-hidden flex"
            )}
          >
            <button
              className="px-2 cursor-pointer truncate"
              type={"button"}
              onClick={handleClickMenu}
              ref={(el: HTMLButtonElement) => (buttonRef.current[0] = el)}
            >
              Any where
            </button>
            <span className="text-[#DDDDDD]">|</span>
            <button
              className="px-2 cursor-pointer truncate"
              type={"button"}
              onClick={handleClickMenu}
              ref={(el: HTMLButtonElement) => (buttonRef.current[1] = el)}
            >
              Any week
            </button>
            <span className="text-[#DDDDDD]">|</span>
            <button
              className="text-[#717171] flex items-center gap-2 px-2 cursor-pointer truncate"
              type={"button"}
              onClick={handleClickMenu}
              ref={(el: HTMLButtonElement) => (buttonRef.current[2] = el)}
            >
              <div>Add guests</div>
              <div className="bg-primary-airbnb p-2 rounded-full">
                <FaSearch color={"white"} size={8} />
              </div>
            </button>
          </div>
        </ButtonRound>
      </motion.div>
      <motion.div className="w-full h-[175px] absolute top-0 left-0 bg-red-400 z-[2] flex flex-col">
        <div className="h-[80px] z-[5] flex justify-center items-center text-white gap-10 relative">
          <p>stays</p>
          <p>Experiences</p>
          <p>Online Experiences</p>
        </div>
        <div className="flex-auto flex justify-center">
          <form>
            <ButtonRound className="min-h-[66px] w-[848px] p-0 overflow-hidden shadow-xl gap-0">
              <Popover>
                <PopoverTrigger
                  onClick={() => {
                    console.log(refInput.current);
                  }}
                >
                  <Input
                    className="py-0 px-8"
                    title={"Where"}
                    placeHolder="Search destinations"
                    ref={(el) => (el ? refInput.current.push(el) : null)}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  Place content for the popover here.
                </PopoverContent>
              </Popover>
              <Input
                className="w-[130px] px-6 flex flex-col justify-center overflow"
                title={"Check In"}
                placeHolder="Add dates"
                disableInput
              />
            </ButtonRound>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default NavbarSearch