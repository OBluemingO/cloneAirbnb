import { cn } from '@/lib/utils'
import React from 'react'
import { forwardRef } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ButtonRound = forwardRef(({ children, className, ...props }: Props, ref: any) => {
  return (
    <div 
      className={cn('text-header flex gap-4 rounded-full bg-white text-black py-2 px-8 border-[#DDDDDD] border-2 max-h-[44px]', className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
})

ButtonRound.displayName = ''

export default ButtonRound