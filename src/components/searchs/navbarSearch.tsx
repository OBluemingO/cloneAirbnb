'use client'
import React, { useEffect, useRef, useState, MutableRefObject } from 'react'
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

const NavbarSearch = ({className, ...props}: IProps) => {
  const [showAddtionalMenu, setShowAddtionalMenu] = useState<IShowAddionalState>({
    status: false,
    current: ''
  })
  const [hostMenu, setHostMenu] = useState<string>('')

  const [isPopSearchDestination, setIsPopSearchDestination] = useState<boolean>(false)
  const [isPopCalendarStart, setIsPopCalendarStart] = useState<boolean>(false)
  const [isPopCalendarEnd, setIsPopCalendarEnd] = useState<boolean>(false)


  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const refInput = useRef<any[]>([])
  const buttonRef = useRef<HTMLButtonElement[]>([])
  // const popoverRef = useRef<React.FC<PopoverProps>[]>([])
  const popoverRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    document.documentElement.style.overflowY = showAddtionalMenu.status ? 'hidden' : 'auto'
  }, [showAddtionalMenu])

  useEffect(() => {
    let Timmer:any = null
    switch (showAddtionalMenu.current) {
      case 'Any where':
        setHostMenu('stays')
        Timmer = setTimeout(() => {
          setIsPopSearchDestination(true)
        }, 300);
        break
      default:
        return
    }

    return () => Timmer ? clearTimeout(Timmer) : undefined
  }, [showAddtionalMenu.current])

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const current = (e.target as HTMLDivElement).innerText
    setShowAddtionalMenu({
      current,
      status: true,
    })
  }

  const handleClickHostName = (e: React.MouseEvent<HTMLButtonElement>) => {
    const current = (e.target as HTMLDivElement).innerText
    setHostMenu(current)
  }

  return (
    <>
      <motion.div 
        className={cn('justify-center items-center h-[80px]', className)}
        animate={{
          opacity: showAddtionalMenu.status ? 0 : 100,
          height: showAddtionalMenu.status ? '175px': '80px',
          scale: showAddtionalMenu.status ? 1.25 : 1,
        }}
      >
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
      <motion.div 
        className="w-full absolute top-0 left-0 flex flex-col bg-white"
        initial={{ opacity: 0, zIndex: -1, height: 'h-[80px]' }}
        animate={{ 
          opacity: showAddtionalMenu.status ? 100 : 0,
          zIndex: showAddtionalMenu.status ? 2 : -1,
          height: showAddtionalMenu.status ? 'h-[175px]' : 'h-[80px]',
        }}
      >
        <motion.div 
          className="md:h-[180px] lg:h-[80px] flex justify-center items-center text-black gap-10 relative bg-white"
          initial={{ transform: 'translateY(-100%)' }}
          animate={{ transform: showAddtionalMenu.status ? 'translateY(0%)' : 'translateY(-100%)' }}
        >
          <button 
            className={cn(`
              after:absolute 
              after:left-0 after:bottom-0
              after:w-full after:h-[1px]
              hover:after:opacity-100 
              hover:after:scale-100
              relative
              after:transition-all
              after:duration-500
            `, 
            hostMenu === 'stays' ? 
              'after:opacity-100 after:scale-100 after:bg-black' 
            : 'after:opacity-0 after:scale-0 after:bg-gray-200')}
            onClick={handleClickHostName}
          >
            stays
          </button>
          <button
            className={cn(`
              after:absolute 
              after:left-0 after:bottom-0
              after:w-full after:h-[1px]
              hover:after:opacity-100 
              hover:after:scale-100
              relative
              after:transition-all
              after:duration-500
            `, 
            hostMenu === 'Experiences' ? 
              'after:opacity-100 after:scale-100 after:bg-black' 
            : 'after:opacity-0 after:scale-0 after:bg-gray-200')}
            onClick={handleClickHostName}
          >
            Experiences
          </button>
          <button
            className={cn(`
              after:absolute 
              after:left-0 after:bottom-0
              after:w-full after:h-[1px]
              hover:after:opacity-100 
              hover:after:scale-100
              relative
              after:transition-all
              after:duration-500
            `, 
            hostMenu === 'Online Experiences' ? 
              'after:opacity-100 after:scale-100 after:bg-black' 
            : 'after:opacity-0 after:scale-0 after:bg-gray-200')}
            onClick={handleClickHostName} 
          >
            Online Experiences
          </button>
        </motion.div>
        <motion.div 
          className="flex-auto flex justify-center z-[4]"
          initial={{ scale: 0.4, height: 0 }}
          animate={{ scale: showAddtionalMenu.status ? 1 : 0.4, height: showAddtionalMenu.status ? '95px' : 0 }}
        >
          <form>
            <ButtonRound 
              className="min-h-[66px] h-full w-[848px] p-0 overflow-hidden shadow-xl gap-0 border-[1px]"
            >
              <Popover 
                open={isPopSearchDestination || isPopCalendarStart || isPopCalendarEnd} 
              >
                <PopoverTrigger asChild>
                  <div className='flex'>
                    <div
                      className='h-full'
                      ref={(el) => el ? (popoverRef.current[0] = el) : null}
                     >
                      <Input
                        className={cn("relative py-0 px-8 h-full text-left ", isPopSearchDestination ? 'bg-gray-100 shadow-xl' : '')}
                        title={"Where"}
                        placeHolder="Search destinations"
                        ref={(el) => (el ? (refInput.current[0] = el) : null)}
                        onClick={() => {
                          setIsPopSearchDestination(true)
                          // setisPopCalendarStart(false)
                        }}
                      />
                    </div>
                    <div
                      ref={(el) => el ? (popoverRef.current[1] = el) : null}
                    >
                      <Input
                        className={cn(
                          "py-0 px-3 h-full w-[130px] text-center",
                          isPopCalendarStart ? 'bg-gray-100' : ''
                        )}
                        title={"Check In"}
                        placeHolder="Add dates"
                        placeHolderAlign={'center'}
                        onClick={() => {
                          setIsPopCalendarStart(true)
                        }}
                        // ref={(el) => (el ? (refInput.current[1] = el) : null)}
                        disableInput
                      />
                    </div>
                    <div
                      ref={(el) => el ? (popoverRef.current[2] = el) : null}
                    >
                      <Input
                        className={cn(
                          "py-0 px-3 h-full w-[130px] text-center",
                          // isPopSearchDestination ? 'bg-gray-100' : ''
                        )}
                        onClick={() => {
                          setIsPopCalendarEnd(true)
                        }}
                        title={"Check Out"}
                        placeHolder="Add dates"
                        placeHolderAlign={'center'}
                        // ref={(el) => (el ? (refInput.current[1] = el) : null)}
                        disableInput
                      />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className='w-[848px] h-[500px] mt-3 rounded-3xl'
                  align='start'
                  onOpenAutoFocus={() => {
                    isPopSearchDestination && refInput.current[0].focus()
                  }}
                  onPointerDownOutside={(e) => {
                    const buttonFindAddress = !popoverRef.current[0].contains(e.target as Node)
                    const buttonCheckin = !popoverRef.current[1].contains(e.target as Node)
                    const buttonCheckout = !popoverRef.current[2].contains(e.target as Node)

                    if(isPopSearchDestination && buttonFindAddress) setIsPopSearchDestination(false)
                    if(isPopCalendarStart && buttonCheckin) setIsPopCalendarStart(false)
                    if(isPopCalendarEnd && buttonCheckout ) setIsPopCalendarEnd(false)
                  }}
                >
                  {
                    isPopSearchDestination ?
                      <div className='flex w-full h-full'>
                        <div className='flex-1'>
                          <RecentSearch />
                        </div>
                        <div className='h-full w-[1px] bg-gray-100'></div>
                        <div className='flex-1'>
                          <SearchByRegion />
                        </div>
                      </div>
                      : <></>
                  }
                  {
                    isPopCalendarStart || isPopCalendarEnd ?
                      <div className='flex h-full bg-black'>mock mock</div>
                    : <></>
                  }
                </PopoverContent>
              </Popover>
            </ButtonRound>
          </form>
        </motion.div>
      </motion.div>
      <motion.div
        className='bg-black w-full h-screen absolute top-0 left-0'
        initial={{ opacity: 0, z: -1, display: 'none' }}
        animate={{ opacity: showAddtionalMenu.status ? '10%' : 0, zIndex: showAddtionalMenu.status ? 1 : -1, display: showAddtionalMenu.status ? 'block' : 'none' }}
        onClick={() => setShowAddtionalMenu({ status: false, current: '' })}
      />
    </>
  );
}

export default NavbarSearch