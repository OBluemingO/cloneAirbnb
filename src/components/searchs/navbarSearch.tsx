'use client'
import React, { useEffect, useRef, useState } from 'react'
import ButtonRound from '../buttons/buttonRound'
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion'
import { navbarSearchAnimate } from './animate'
import clsx from 'clsx';

interface IShowAddionalState {
  status: boolean
  current: string
}

const NavbarSearch = () => {
  const [showAddtionalMenu, setShowAddtionalMenu] = useState<IShowAddionalState>({
    status: false,
    current: ''
  })
  const ref = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<Array<HTMLButtonElement>>([])

  useEffect(() => {
    document.documentElement.style.overflowY = showAddtionalMenu.status ? 'hidden' : 'auto'
  }, [showAddtionalMenu])

  useEffect(() => {
    if (showAddtionalMenu.current === '') {
      for (let i = 0; i <= buttonRef.current.length - 1; i++) {
        buttonRef.current[i].style.backgroundColor = 'white'
      }
      return
    }

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
  }, [showAddtionalMenu.current])

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    const current = (e.target as HTMLDivElement).innerText
    setShowAddtionalMenu({
      current,
      status: true,
    })

  }

  
  return (
    <>
      <div className={clsx('relative w-full')}>
          <motion.div 
            className='gap-4 justify-center flex items-center overflow-hidden'  
            initial={{ height: '0px' }}
            variants={navbarSearchAnimate}
            animate={showAddtionalMenu.status ? 'show' : 'hidden'}
          >
            <div>mock</div>
            <div>mock</div>
            <div>mock</div>
            <div>mock</div>
          </motion.div>
          <motion.div className={clsx(showAddtionalMenu.status ? '' : '')}>
            <ButtonRound className={clsx('justify-between flex transition-all overflow-hidden')} ref={ref}>
              <div className={clsx('justify-between transition-all overflow-hidden flex')}>
                <button
                  className='px-2 rounded-full hover:bg-gray-100 cursor-pointer'
                  type={'button'}
                  onClick={handleClickMenu}
                  ref={(el: HTMLButtonElement) => buttonRef.current[0] = el}
                >
                  Any where
                </button>
                <span className='text-[#DDDDDD]'>|</span>
                <button
                  className='px-2 rounded-full hover:bg-gray-100 cursor-pointer'
                  type={'button'}
                  onClick={handleClickMenu}
                  ref={(el: HTMLButtonElement) => buttonRef.current[1] = el}
                >
                  Any week
                </button>
                <span className='text-[#DDDDDD]'>|</span>
                <button
                  className='text-[#717171] flex items-center gap-2 px-2 rounded-full hover:bg-gray-100 cursor-pointer'
                  type={'button'}
                  onClick={handleClickMenu}
                  ref={(el: HTMLButtonElement) => buttonRef.current[2] = el}
                >
                  <div>
                    Add guests
                  </div>
                  <div className='bg-primary-airbnb p-2 rounded-full'>
                    <FaSearch color={'white'} size={10} />
                  </div>
                </button>
              </div>
            </ButtonRound>
          </motion.div>
          {/* <motion.div layoutId='mock-2' className='scale-150'>
            <ButtonRound className={clsx('justify-between flex transition-all overflow-hidden')} ref={ref}>
              <div className={clsx('justify-between transition-all overflow-hidden flex')}>
                <button
                  className='px-2 rounded-full hover:bg-gray-100 cursor-pointer'
                  type={'button'}
                  onClick={handleClickMenu}
                  ref={(el: HTMLButtonElement) => buttonRef.current[0] = el}
                >
                  Any where
                </button>
                <span className='text-[#DDDDDD]'>|</span>
                <button
                  className='px-2 rounded-full hover:bg-gray-100 cursor-pointer'
                  type={'button'}
                  onClick={handleClickMenu}
                  ref={(el: HTMLButtonElement) => buttonRef.current[1] = el}
                >
                  Any week
                </button>
                <span className='text-[#DDDDDD]'>|</span>
                <button
                  className='text-[#717171] flex items-center gap-2 px-2 rounded-full hover:bg-gray-100 cursor-pointer'
                  type={'button'}
                  onClick={handleClickMenu}
                  ref={(el: HTMLButtonElement) => buttonRef.current[2] = el}
                >
                  <div>
                    Add guests
                  </div>
                  <div className='bg-primary-airbnb p-2 rounded-full'>
                    <FaSearch color={'white'} size={10} />
                  </div>
                </button>
              </div>
            </ButtonRound>
          </motion.div> */}
      </div>
      {/* <div 
        className={clsx('w-full h-fit bg-black', showAddtionalMenu.status ? 'opacity-20 z-50' : 'opacity-0 -z-50')} 
        onClick={() => setShowAddtionalMenu({ current: '', status: false })}
      /> */}
    </>
  )
}

export default NavbarSearch