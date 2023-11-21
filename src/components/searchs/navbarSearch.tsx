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
import RecentSearch from '../ui/recentSearch';
import SearchByRegion from '../ui/searchByRegion';

interface IShowAddionalState {
  status: boolean
  current: string
}

interface IProps extends Partial<HTMLDivElement> {}
interface Aa extends  Partial< HTMLInputElement>{
  focus(): void
}

const NavbarSearch = ({className, ...props}: IProps) => {
  const [showAddtionalMenu, setShowAddtionalMenu] = useState<IShowAddionalState>({
    status: false,
    current: ''
  })
  const [disableButton, setDisableButton] = useState<boolean>(false)

  const ref = useRef() as MutableRefObject<HTMLDivElement>
  // const refInput = useRef([]) as MutableRefObject<HTMLInputElement[]>
  // const refInput = useRef<HTMLInputElement[]>([])
  const refInput = useRef<any[]>([])
  const buttonRef = useRef<HTMLButtonElement[]>([])

  // useEffect(() => {
  //   refInput.current = Array.from({ length: 4 }, (_, idx) => refInput.current![idx] || null)
  // },[])

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
            <ButtonRound 
              className="min-h-[66px] w-[848px] p-0 overflow-hidden shadow-xl gap-0"
            >
              <Popover 
                open={disableButton} 
                onOpenChange={(e: any) => disableButton ? null : setDisableButton(e)}
              >
                <PopoverTrigger>
                  <Input
                    className="py-0 px-8 h-full text-left"
                    title={"Where"}
                    placeHolder="Search destinations"
                    ref={(el) => (el ? (refInput.current[0] = el) : null)}
                  />
                </PopoverTrigger>
                <PopoverContent 
                  className='w-[848px] h-[500px] mt-3 rounded-3xl'
                  align='start' 
                  onOpenAutoFocus={(e) => refInput.current[0].focus()}
                >
                  <div className='flex w-full h-full'>
                    <div className='flex-1'>
                      <RecentSearch />
                    </div>
                    <div className='h-full w-[1px] bg-gray-100'></div>
                    <div className='flex-1'>
                      <SearchByRegion />
                    </div>
                  </div>
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