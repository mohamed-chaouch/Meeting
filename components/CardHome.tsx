import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const CardHome = ({color, srcIcon, title, description, handleClick}:{color : string, srcIcon: string, title: string, description: string, handleClick : () => void }) => {
  return (
    <div className={cn(`cursor-pointer hover:scale-105 w-full md:w-[48%] lg:w-[23.8%] rounded-lg p-4 m-1`, {
        'bg-orange-500': color === 'orange',
        'bg-blue-500': color === 'blue',
        'bg-purple-500': color === 'purple',
        'bg-yellow-500': color === 'yellow'
      })} 
      onClick={handleClick}
    >
        <div className="bg-gray-50 bg-opacity-[0.3] p-2 rounded-md inline-block">
          <Image src={srcIcon} alt="Add meet" width={24} height={24} />
        </div>
        <div>
            <h1 className="pt-12">{title}</h1>
            <p className="text-gray-300">{description}</p>
        </div>
    </div>
  )
}

export default CardHome