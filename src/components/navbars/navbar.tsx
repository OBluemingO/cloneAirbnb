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
import { LayoutMenu, MenuItem } from '../ui/menu'
import { GiCampingTent, GiFamilyHouse  } from "react-icons/gi";
import { useSearchParams } from 'next/navigation'
import { IoFilter } from "react-icons/io5";
// import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Switch } from '../ui/switch'
import useSetParams from '@/hook/useSetParams'
import { motion } from 'framer-motion'

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
      <nav 
        className="bg-white flex items-center px-[80px] text-header border-b justify-between"
      >
        <div className='flex justify-start flex-1'>
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
            <div className='text-primary-airbnb font-semibold'>airbnb</div>
          </div>
        </div>
        <div className='justify-center hidden h-auto w-auto xl:flex'>
          <NavbarSearch />
        </div>
        <div className='flex justify-end flex-1'>
          <div className='text-black text-header flex items-center gap-4'>
            <div className='hidden lg:block p-2 rounded-full hover:bg-gray-100 cursor-pointer'>Airbnb your home</div>
            <button className='p-2 rounded-full hover:bg-gray-100 cursor-pointer' type={'button'}><TfiWorld /></button>
            <ButtonRound>
              <div className='flex gap-3 items-center'>
                <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                  <GiHamburgerMenu  />
                </div>
                <Avatar className='h-[27px] w-[27px]'>
                  <AvatarImage src="" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </div>
            </ButtonRound>
          </div>
        </div>
      </nav>
      <nav className="h-[80px] mt-[10px] bg-white flex items-center px-[80px] text-header gap-[10px] justify-between text-xs">
        <LayoutMenu className={'items-center w-full lg:w-[62.5%] overflow-x-auto relative no-scrollbar'}>
          {/* <div className={clsx('group h-full grid place-items-center px-5 transition-all sticky left-0', isFirstMenu ? `` : `bg-gradient-to-r from-white`)}>
            <ButtonRound
              className={clsx('px-2 py-1 cursor-pointer relative z-20', hiddenArrowLeft)}
              onClick={() => handleClickMenu('left')}
            >
              <RxChevronLeft style={{ color: '#5e5e5e', fontSize: '1.5rem' }} />
            </ButtonRound>
            <div className={clsx('bg-gray-200 w-full h-full absolute z-10 rounded-full blur-sm opacity-0', isFirstMenu ? `group-hover:opacity-0` : ` group-hover:opacity-100`)}></div>
          </div> */}
          {menu.map((el, idx) => (
            <MenuItem
              header={el.topic.charAt(0).toUpperCase() + el.topic.slice(1)}
              logo={el.logo}
              active={currentCategorie == el.topic}
              key={`${el.topic}-${idx}`}
              className='group'
            />
          ))}
          {/* <div className={clsx('group h-3/4 grid place-items-center px-5 transition-all sticky right-0', isLastMenu ? `` : `bg-gradient-to-l from-white`)}>
            <ButtonRound
              className={clsx('px-2 py-1 cursor-pointer relative z-20', hiddenArrowRight)}
              onClick={() => handleClickMenu('right')}
            >
              <RxChevronRight style={{ color: '#5e5e5e', fontSize: '1.5rem' }} />
            </ButtonRound>
            <div className={clsx('bg-gray-200 w-full h-full absolute z-10 rounded-full blur-sm opacity-0', isLastMenu ? `group-hover:opacity-0` : ` group-hover:opacity-100`)}></div>
          </div> */}
        </LayoutMenu>
        <div className={`w-auto h-full items-center gap-4 justify-end hidden lg:flex`}>
          <ButtonRound className='w-fit flex gap-2 items-center cursor-pointer px-4 h-[44px]'>
            Filter <IoFilter />
          </ButtonRound>
          <ButtonRound className='w-fit min-w-[250px] flex items-center px-4 h-[44px]'>
            <p>
              Display total before taxes
            </p>
            <Switch />
          </ButtonRound>
        </div>
      </nav>
    </>
  )
}

export default Navbar