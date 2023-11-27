'use client'
import React, { useEffect, useRef, useState, MutableRefObject, useDebugValue, useMemo } from 'react'
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
import { Calendar } from '../ui/calendar';
import { Calendar as CalendarIcon } from "lucide-react"
import { addDays, format, addYears } from "date-fns"
import { DateRange } from 'react-day-picker';
import { TbPlusMinus } from "react-icons/tb";

interface IShowAddionalState {
  status: boolean
  current: string
}

interface IProps extends Partial<HTMLDivElement> { }
interface ICheckInComponentProps {
  isPopCalendarGroup: boolean
}

const CheckInComponent = ({ isPopCalendarGroup }: ICheckInComponentProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [menu, setMenu] = useState('Dates')
  const [exactDates, setExactDates] = useState<number>(0)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const current = (e.target as HTMLDivElement).innerText
    setMenu(current)
  }

  if (!isPopCalendarGroup) return <></>
  
  const getCurrentMonth = () => {
    const date = new Date()
    const month = date.getMonth()
    const year = date.getFullYear()
    return new Date(year, month)
  } 

  return (
    <div className='flex flex-col items-center h-full'>
      <ButtonRound className='max-h-none px-2 w-fit border-none bg-gray-200'>
        <ButtonRound
          className={cn('border-none bg-transparent cursor-pointer', menu === 'Dates' ? 'bg-white' : '')}
          onClick={handleClick}
        >
          Dates
        </ButtonRound>
        <ButtonRound
          className={cn('border-none bg-transparent cursor-pointer', menu === 'Months' ? 'bg-white' : '')}
          onClick={handleClick}
        >
          Months
        </ButtonRound>
        <ButtonRound
          className={cn('border-none bg-transparent cursor-pointer', menu === 'Flexible' ? 'bg-white' : '')}
          onClick={handleClick}
        >
          Flexible
        </ButtonRound>
      </ButtonRound>
      {
        menu == 'Dates' ?
          <div className='w-full h-full relative'>
            <Calendar
              className='w-full h-auto pt-6'
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              fromMonth={getCurrentMonth()}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              showOutsideDays={false}
            />
            <div className='absolute bottom-0 left-0 px-7 w-full flex gap-2'>
              {Array.from({length: 5}, (_, idx) => idx == 4 ? 7 : idx).map((item, index) => (
                <ButtonRound 
                  className={cn('max-h-[32px] py-1 px-3 text-xs cursor-pointer w-auto gap-1', exactDates == item ? 'border-black' : 'border-gray-200')}
                  key={`button-${index}-checkin-${item}`}
                  onClick={() => setExactDates(item)}
                >
                  <div className='grid place-items-center'> 
                    {item != 0 ? <TbPlusMinus /> : <></>}
                  </div>
                  {item == 0 ? 'Exact dates' : `${item} days`}
                </ButtonRound>
              ))}
            </div>
          </div>
          : <></>
      }
    </div>
  )
}

const NavbarSearch = ({ className, ...props }: IProps) => {
  const [showAddtionalMenu, setShowAddtionalMenu] = useState<IShowAddionalState>({
    status: false,
    current: ''
  })
  const [hostMenu, setHostMenu] = useState<string>('')
  const [isPopSearchDestination, setIsPopSearchDestination] = useState<boolean>(false)
  const [isPopCalendarGroup, setIsPopCalendarGroup] = useState<boolean>(false)
  const [isPopCalendarStart, setIsPopCalendarStart] = useState<boolean>(false)
  const [isPopCalendarEnd, setIsPopCalendarEnd] = useState<boolean>(false)
  const [isPopGuest, setIsPopGuest] = useState<boolean>(false)

  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const refInput = useRef<any[]>([])
  const buttonRef = useRef<HTMLButtonElement[]>([])
  const popoverRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    document.documentElement.style.overflowY = showAddtionalMenu.status ? 'hidden' : 'auto'
  }, [showAddtionalMenu])

  useEffect(() => {
    let Timmer: any = null
    switch (showAddtionalMenu.current) {
      case 'Any where':
        setHostMenu('stays')
        Timmer = setTimeout(() => {
          setIsPopSearchDestination(true)
        }, 300);
        break
      case 'Any week':
        setHostMenu('stays')
        Timmer = setTimeout(() => {
          setIsPopCalendarStart(true)
          setIsPopCalendarGroup(true)
        }, 300);
        break
      case 'Add guests':
        setHostMenu('stays')
        Timmer = setTimeout(() => {
          setIsPopGuest(true)
        }, 300);
      default:
        setIsPopCalendarEnd(false)
        setIsPopCalendarStart(false)
        setIsPopCalendarGroup(false)
        setIsPopSearchDestination(false)
        setIsPopGuest(false)
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

  const handleOnPointerDownOutside = (e: any) => {
    const buttonFindAddress = !popoverRef.current[0].contains(e.target as Node)
    const buttonCheckIn = !popoverRef.current[1].contains(e.target as Node)
    const buttonCheckout = !popoverRef.current[2].contains(e.target as Node)
    const buttonGuest = !popoverRef.current[3].contains(e.target as Node)

    const whenNotClickGroupCalendar = !buttonFindAddress || !buttonGuest
    if (whenNotClickGroupCalendar) setIsPopCalendarGroup(false)

    if (isPopSearchDestination && buttonFindAddress) setIsPopSearchDestination(false)
    if (isPopCalendarStart && buttonCheckIn) setIsPopCalendarStart(false)
    if (isPopCalendarEnd && buttonCheckout) setIsPopCalendarEnd(false)
    if (isPopGuest && buttonGuest) setIsPopGuest(false)
  }

  const handleOnFocusInput = () => {
    if (isPopSearchDestination) refInput.current[0].focus()
  }

  // const delayPopoverWidth = () => {
  //   const timmer = setTimeout(() => {
  //     return isPopGuest
  //   }, 300);
  //   return timmer
  // }

  // const delayPopover = useMemo(() => {
  //   setTimeout(() => {
  //     console.log('first')
  //   }, 1000);
  //   return isPopGuest
  // }, [isPopGuest])

  return (
    <>
      <motion.div
        className={cn('justify-center items-center h-[80px]', className)}
        animate={{
          opacity: showAddtionalMenu.status ? 0 : 100,
          height: showAddtionalMenu.status ? '175px' : '80px',
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
                open={isPopSearchDestination || isPopCalendarGroup || isPopGuest}
              >
                <PopoverTrigger asChild>
                  <div className='flex'>
                    <div
                      className='h-full'
                      ref={(el) => el ? (popoverRef.current[0] = el) : null}
                    >
                      <Input
                        className={cn(
                          "relative py-0 px-8 h-full text-left ",
                          isPopSearchDestination ? 'bg-gray-100 shadow-xl' : '')
                        }
                        title={"Where"}
                        placeHolder="Search destinations"
                        ref={(el) => (el ? (refInput.current[0] = el) : null)}
                        onClick={() => {
                          setIsPopSearchDestination(true)
                        }}
                        typeof='button'
                      />
                    </div>
                    <div
                      className='flex'
                      onClick={() => {
                        setIsPopCalendarGroup(true)
                      }}
                      typeof='button'
                    >
                      <div
                        ref={(el) => el ? (popoverRef.current[1] = el) : null}
                      >
                        <Input
                          className={cn(
                            "py-0 px-3 h-full w-[130px] text-center",
                            isPopCalendarStart ? 'bg-gray-100 shadow-xl' : ''
                          )}
                          title={"Check In"}
                          placeHolder="Add dates"
                          placeHolderAlign={'center'}
                          onClick={() => setIsPopCalendarStart(true)}
                          disableInput
                        />
                      </div>
                      <div
                        ref={(el) => el ? (popoverRef.current[2] = el) : null}
                      >
                        <Input
                          className={cn(
                            "py-0 px-3 h-full w-[130px] text-center",
                            isPopCalendarEnd ? 'bg-gray-100 shadow-xl' : ''
                          )}
                          onClick={() => setIsPopCalendarEnd(true)}
                          title={"Check Out"}
                          placeHolder="Add dates"
                          placeHolderAlign={'center'}
                          disableInput
                        />
                      </div>
                    </div>
                    <div
                      className='h-full'
                      ref={(el) => el ? (popoverRef.current[3] = el) : null}
                    >
                      <Input
                        className={cn(
                          "relative py-0 px-8 h-full text-left ",
                          isPopGuest ? 'bg-gray-100 shadow-xl' : '')
                        }
                        title={"Who"}
                        placeHolder="Add guests"
                        onClick={() => {
                          setIsPopGuest(true)
                        }}
                        typeof='button'
                        disableInput
                      />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className={cn('mt-3 rounded-3xl w-[848px] h-[500px]')}
                  align={'start'}
                  onOpenAutoFocus={handleOnFocusInput}
                  onPointerDownOutside={handleOnPointerDownOutside}
                >
                  {isPopSearchDestination ?
                    <motion.div
                      className='flex w-full h-full'
                    >
                      <div className='flex-1'>
                        <RecentSearch />
                      </div>
                      <div className='h-full w-[1px] bg-gray-100'></div>
                      <div className='flex-1'>
                        <SearchByRegion />
                      </div>
                    </motion.div>
                    : <></>}
                  <CheckInComponent isPopCalendarGroup={isPopCalendarGroup} />
                  {isPopGuest ?
                    <div className='flex w-full h-full'>
                      <div className='flex-1 px-4 pt-2'></div>
                      <div className='h-full w-[1px] bg-gray-100'></div>
                      <div className='flex-1 px-4 pt-2'>Search by region</div>
                    </div>
                    : <></>}
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