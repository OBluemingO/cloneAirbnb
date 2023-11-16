import React from 'react'
import ButtonRound from '../buttons/buttonRound'

const NavbarSearch = () => {
  return (
    <ButtonRound>
      <button type={'button'}>Any where</button>
      <span className='text-[#DDDDDD]'>|</span>
      <button type={'button'}>Any week</button>
      <span className='text-[#DDDDDD]'>|</span>
      <button className='text-[#717171]' type={'button'}>Add guests</button>
    </ButtonRound>
  )
}

export default NavbarSearch