"use client"
import { motion, useDragControls } from 'framer-motion'
import { cn } from "@/lib/utils"
import React from "react"
import useSetParams from '@/hook/useSetParams'
import { ScrollArea, ScrollBar } from "./scroll-area";

interface Props {
  logo: React.ReactNode
  header: string
  className?: string
  active: boolean
}

interface LayoutProps {
  children: React.ReactNode
  className: string
}


const LayoutMenu = React.forwardRef<
  HTMLDivElement,
  LayoutProps
>(({ children, className }, ref) => {
  
  return (
      <ScrollArea
        className={cn("flex gap-10 w-full h-full", className)} 
        ref={ref}
        scrollHidden={true}
      >
        <div className='flex w-max space-x-10 p-4'>
          {children}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
  )
})

LayoutMenu.displayName = ''

const MenuItem = React.forwardRef<
  HTMLDivElement,
  Props
>(({ logo, header, className, active }, ref) => {
  const { setRawQuery } = useSetParams()

  return (
    <motion.div
      className={cn("flex flex-col items-center cursor-pointer", className)} ref={ref}
      onClick={() => {
        setRawQuery((prev) => ({
          ...prev,
          cate: header.toLowerCase(),
        }))
      }}
    >
      <div>
        {logo}
      </div>
      <div>{header}</div>
      {
        active ? <motion.div layoutId='under-line' className='border-t-2 border-black w-full' /> : <div className='border-t-2 border-gray-200 w-full opacity-0 group-hover:opacity-100'></div>
      }
    </motion.div>
  )
})

MenuItem.displayName = ''

export {
  LayoutMenu,
  MenuItem,
}