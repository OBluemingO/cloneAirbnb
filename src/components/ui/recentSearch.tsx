import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { FaRegClock } from "react-icons/fa6";

const RecentSearch = () => {
  const country_name = [
    'thai',
    'japan',
    'korea',
    'china',
    'china',
    'china',
    'china',
    'china',
    'china',
    'china',
    'china',
    'china',
    'china',
    'china',
  ]

  const [data, setData] = useState<any[]>(country_name)

  return (
    <div className='flex flex-col w-full h-full items-center'>
      <div className='w-full py-2 px-6 mb-[10px]'>Recent searches</div>
      <div className='w-full overflow-hidden'>
        <ScrollArea className='w-full h-full'>
          {country_name.map((el, idx) => (
            <div className='px-6 h-[48px] mb-2 hover:bg-gray-100 flex items-center gap-3 cursor-pointer' key={`${el}_${idx}`}>
              <div className='bg-[#DDDDDD] p-2 rounded-md'>
                <FaRegClock />
              </div>
              <div className='flex flex-col leading-none'>
                <div>{el} - stay</div>
                <div className='text-xs'>any where</div>
              </div>
            </div>
          )
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

export default RecentSearch