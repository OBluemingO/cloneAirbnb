'use client'
import {motion} from 'framer-motion'
import React from 'react'
import RecentSearch from './recentSearch'
import SearchByRegion from './searchByRegion'

interface Props {
  isOpen: boolean
}

const SearchRegionDestinationContent = ({ isOpen }: Props) => {
  if (!isOpen) return <></>;

  return (
    <motion.div className="flex w-full h-full">
      <div className="flex-1">
        <RecentSearch />
      </div>
      <div className="h-full w-[1px] bg-gray-100"></div>
      <div className="flex-1">
        <SearchByRegion />
      </div>
    </motion.div>
  );
};

export default SearchRegionDestinationContent