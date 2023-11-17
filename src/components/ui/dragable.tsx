import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

const Dragable = ({children}: Props) => {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [x, setX] = useState(0)
  const [sliderConstraints, setSliderConstraints] = useState<number>(0)

  return (
    <motion.div
      className='w-full h-full overflow-x-hidden flex'
      ref={sliderRef}
      drag="x"
      initial={{ x: 0 }}
      style={{ x }}
      dragConstraints={{
        left: -sliderConstraints,
        right: 0
      }}
      // dragTransition={{ bounceStiffness, bounceDamping }}
    >
      {children}
    </motion.div>
  )
}

export default Dragable
