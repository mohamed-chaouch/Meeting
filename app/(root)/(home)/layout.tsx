'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React, { ReactNode, useState } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const [menuClicked, setMenuClicked] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed w-full">
        <Navbar menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
      </div>
      <div className="flex flex-1 mt-[60px]">
        <Sidebar menuClicked={menuClicked} setMenuClicked={setMenuClicked} />
        <div className={`flex-1 ${menuClicked && 'sm:pl-[264px]'} overflow-auto`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
