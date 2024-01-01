import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './button'
import InputCount from './InputCount';

interface Props {
  isOpen: boolean

}
// write interface for count
export interface ICount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

const GuestContent = ({ isOpen }: Props) => {
  const [count, setCount] = useState<ICount>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  useEffect(() => {
    const group = [count.children, count.infants, count.pets]

    if (group.some((el) => el > 0))
      setCount((prev) => ({ ...prev, adults: 1 }));
  }, [count.children, count.infants, count.pets])

  if (!isOpen) return <></>;

  return (
    <div className="flex w-full h-full">
      <div className="flex-1 px-4 py-2 relative rounded-md overflow-hidden">
        <Image
          alt={`place-holder-image`}
          src={`https://www.ezeeabsolute.com/blog/wp-content/uploads/2019/06/guest_experience_hotel-1.jpg`}
          loading={"lazy"}
          quality={100}
          className="object-cover"
          fill
        />
        <div className="absolute left-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-black opacity-50"></div>
      </div>
      <div className="h-full w-[1px] bg-gray-100"></div>
      <div className="flex-1 px-4 pt-2 flex flex-col gap-4">
        <InputCount
          title="adults"
          desc="Ages 13 or above"
          count={count}
          setCount={setCount}
          disabled={count.children > 0 || count.infants > 0 || count.pets > 0}
        />
        <div className="border-[1px] border-solid" />
        <InputCount
          title="children"
          desc="Ages 2 - 12"
          count={count}
          setCount={setCount}
        />
        <div className="border-[1px] border-solid" />
        <InputCount
          title="infants"
          desc="Under 2"
          count={count}
          setCount={setCount}
        />
        <div className="border-[1px] border-solid" />
        <InputCount
          title="pets"
          desc="Bringing a service animal ?"
          count={count}
          setCount={setCount}
        />
      </div>
    </div>
  );
};

export default GuestContent