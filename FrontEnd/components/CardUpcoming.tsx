import moment from 'moment'
import Image from 'next/image'
import React from 'react'

const CardUpcoming = () => {
  return (
    <div className="w-full md:w-[48%]">
        <div className="bg-dark-1 rounded-lg p-4">
            <Image src="icons/schedule.svg" alt="Calendar" width={24} height={24} />
            <div className="pt-2">
                <p>Project title : Meeting 1</p>
                <p className="text-gray-300">{moment(new Date()).format("dddd D, YYYY - hh:mm A")}</p>
            </div>
            <div className="flex -space-x-4 rtl:space-x-reverse pt-5">
                <Image className="border-2 border-white rounded-full dark:border-gray-800" src="/images/avatar-2.jpeg" alt="" width={44} height={44} />
                <Image className="border-2 border-white rounded-full dark:border-gray-800" src="/images/avatar-2.jpeg" alt="" width={44} height={44} />
                <Image className="border-2 border-white rounded-full dark:border-gray-800" src="/images/avatar-2.jpeg" alt="" width={44} height={44} />
                <a className="flex items-center justify-center w-12 h-12 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
            </div>
        </div>
    </div>
    
  )
}

export default CardUpcoming