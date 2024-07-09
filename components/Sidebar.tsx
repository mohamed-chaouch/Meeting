'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import {sidebarLinks} from '../constants/index';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = ({ menuClicked, setMenuClicked }: { menuClicked: boolean, setMenuClicked : Function }) => {
  const pathName = usePathname();

  const handleClick = () => {
    if (window.innerWidth <= 640) { // Adjust this breakpoint as per your design
      setMenuClicked(!menuClicked);
    }
  };
  return (
    <div
      className={`bg-dark-1 w-[264px] h-full fixed sm:relative ${menuClicked ? 'block' : 'hidden'} sm:block z-50`}
    >
      {sidebarLinks.map((sidebarLink) => (
        <Link
          href={sidebarLink.root}
          key={sidebarLink.label}
          className={`text-white px-7 py-4 flex items-center ${pathName === sidebarLink.root && 'bg-blue-1 rounded-lg'}`}
          onClick={handleClick}
        >
          <Image src={sidebarLink.icon} alt={sidebarLink.label} width={24} height={24} className="pr-3" />
          <p className="font-semibold">{sidebarLink.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
