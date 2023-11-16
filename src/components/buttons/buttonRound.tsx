import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ButtonRound = ({ children, className, ...props }: Props) => {
  return (
    <div 
      className={cn('text-header flex gap-4 rounded-full bg-white text-black py-2 px-8 border-[#DDDDDD] border-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default ButtonRound