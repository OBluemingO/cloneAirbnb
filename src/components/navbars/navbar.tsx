'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import NavbarSearch from '../searchs/navbarSearch'
import { TfiWorld } from 'react-icons/tfi'
import ButtonRound from '../buttons/buttonRound'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { GiHamburgerMenu } from 'react-icons/gi'
// import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import Link from 'next/link'
import { FaLongArrowAltRight } from "react-icons/fa";
import { LayoutMenu, MenuItem } from '../ui/menu'
import { GiCampingTent, GiFamilyHouse  } from "react-icons/gi";
import { useSearchParams } from 'next/navigation'
import { IoFilter } from "react-icons/io5";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Switch } from '../ui/switch'
import useSetParams from '@/hook/useSetParams'
import clsx from 'clsx'
import Dragable from '../ui/dragable'

const Navbar = () => {
  const menu = [
    { topic: 'camping', logo: <GiCampingTent size={30} /> },
    { topic: 'house', logo: <GiFamilyHouse size={30} /> },
    { topic: 'mock', logo: <GiFamilyHouse size={30} /> },
    { topic: 'mock_second', logo: <GiFamilyHouse size={30} /> },
    { topic: 'mock_third', logo: <GiFamilyHouse size={30} /> },
    { topic: 'mock_four', logo: <GiFamilyHouse size={30} /> },
    { topic: 'mock_five', logo: <GiFamilyHouse size={30} /> },
    { topic: 'nobis', logo: <GiFamilyHouse size={30} /> },
    { topic: 'voluptas', logo: <GiFamilyHouse size={30} /> },
    { topic: 'nostrum', logo: <GiFamilyHouse size={30} /> },
    { topic: 'ut', logo: <GiFamilyHouse size={30} /> },
    { topic: 'qui', logo: <GiFamilyHouse size={30} /> },
  ]
  const { setRawQuery } =  useSetParams()
  const searchParams = useSearchParams()
  const [currentCategorie, setCurrentCategorie] = useState<string | undefined>()

  const cate = searchParams.get('cate')
  const cateName = useCallback(() => {
    if(!cate) {
      setRawQuery({ cate: 'camping' })
      return 'camping'
    }
    const extractTopic = menu.map(el => el.topic)
    return extractTopic.includes(cate) ? cate : 'camping'
  }, [cate])

  useEffect(() => {
    setCurrentCategorie(cateName)
  }, [cateName])

  const handleClickMenu = (direct: 'left' | 'right') => {
    // const newActiveMenu = direct === 'right' ? menu.findIndex(el => el.topic === cate) + 1 : menu.findIndex(el => el.topic === cate) - 1
    // if (newActiveMenu < 0 || newActiveMenu > menu.length - 1) return
    // setRawQuery((prev) => ({
    //   ...prev,
    //   cate: menu[newActiveMenu].topic
    // }))
  }

  const isFirstMenu = menu.findIndex(el => el.topic === currentCategorie) === 0
  const isLastMenu = menu.findIndex(el => el.topic === currentCategorie) === menu.length - 1
  const hiddenArrowRight = isLastMenu ? 'lg:opacity-0  pointer-events-none' : 'lg:opacity-100 pointer-events-auto'
  const hiddenArrowLeft = isFirstMenu ? 'lg:opacity-0  pointer-events-none' : 'lg:opacity-100 pointer-events-auto'

  return (
    <>
      <nav className="h-[80px] bg-white text-white flex items-center px-[80px] text-header sticky top-0 border-b">
        <div className='basis-2/3 xl:basis-1/3 flex justify-start'>
          <div className='flex items-center gap-4'>
            <div className='w-[40px] h-full'>
              <Image
                alt={`logo-airbnb`}
                src={`https://seeklogo.com/images/A/airbnb-logo-1D03C48906-seeklogo.com.png`}
                loading={'lazy'}
                width={100}
                height={100}
              />
            </div>
            <div className='text-[#ff5977] font-semibold'>airbnb</div>
          </div>
        </div>
        <div className='basis-1/3 justify-center hidden xl:flex'>
          <NavbarSearch />
        </div>
        <div className='basis-1/3 flex justify-end'>
          <div className='text-black text-header flex items-center gap-4'>
            <div className='hidden lg:block'>Airbnb your home</div>
            <button type={'button'}><TfiWorld /></button>
            <ButtonRound>
              <div className='flex gap-3 items-center'>
                <GiHamburgerMenu  />
                <Avatar className='h-[27px] w-[27px]'>
                  <AvatarImage src="" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </div>
            </ButtonRound>
          </div>
        </div>
      </nav>
      <nav className="h-[80px] mt-[10px] bg-white flex items-center px-[80px] text-header sticky top-[80px] shadow-xl text-black gap-[10px] justify-between">
        <LayoutMenu className={'items-center w-[62.5%] overflow-hidden relative'}>
          <div className={clsx('group h-3/4 grid place-items-center px-5 transition-all absolute', isFirstMenu ? `` : `bg-gradient-to-r from-white` )}>
            <ButtonRound
              className={clsx('px-2 py-1 cursor-pointer relative z-20', hiddenArrowLeft)}
              onClick={() => handleClickMenu('left')}
            >
              <RxChevronLeft style={{ color: '#5e5e5e', fontSize: '1.5rem' }} />
            </ButtonRound>
            <div className={clsx('bg-gray-200 w-full h-full absolute z-10 rounded-full blur-sm opacity-0', isFirstMenu ? `group-hover:opacity-0` : ` group-hover:opacity-100`)}></div>
          </div>
          <Dragable>
            {menu.map((el, idx) => (
              <MenuItem
                header={el.topic.charAt(0).toUpperCase() + el.topic.slice(1)}
                logo={el.logo}
                active={currentCategorie == el.topic}
                key={`${el.topic}-${idx}`}
              />
            ))}
          </Dragable>
          <div className={clsx('group h-3/4 grid place-items-center px-5 transition-all absolute right-0', isLastMenu ? `` : `bg-gradient-to-l from-white`)}>
            <ButtonRound
              className={clsx('px-2 py-1 cursor-pointer relative z-20', hiddenArrowRight)}
              onClick={() => handleClickMenu('right')}
            >
              <RxChevronRight style={{ color: '#5e5e5e', fontSize: '1.5rem' }} />
            </ButtonRound>
            <div className={clsx('bg-gray-200 w-full h-full absolute z-10 rounded-full blur-sm opacity-0', isLastMenu ? `group-hover:opacity-0` : ` group-hover:opacity-100`)}></div>
          </div>
        </LayoutMenu>
        {/* <div className='group h-3/4 grid place-items-center px-5 relative  transition-all'>
          <ButtonRound 
            className={clsx('px-2 py-1 cursor-pointer relative z-20', hiddenArrowRight)}
            onClick={() => handleClickMenu('right')}
          >
            <RxChevronRight style={{ color: '#5e5e5e', fontSize: '1.5rem' }} />
          </ButtonRound> 
          <div className={clsx('bg-gray-200 w-full h-full absolute z-10 rounded-full blur-sm opacity-0', isLastMenu ? `group-hover:opacity-0` : ` group-hover:opacity-100`)}></div>
        </div> */}

        {/* <ButtonRound 
          className={clsx('px-2 py-1 cursor-pointer', hiddenArrowRight)}
          onClick={() => handleClickMenu('right')}
        >
          <RxChevronRight style={{ color: '#5e5e5e', fontSize: '1.5rem' }} />
        </ButtonRound> */}
        <div className={`border-2 w-auto h-full flex items-center gap-4 justify-end`}>
          <ButtonRound className='w-fit flex gap-2 items-center cursor-pointer'>
            filter <IoFilter />
          </ButtonRound>
          <ButtonRound className='w-fit'>
            Display total before taxes
            <Switch />
          </ButtonRound>
        </div>
      </nav>
    </>
  )
}

export default Navbar