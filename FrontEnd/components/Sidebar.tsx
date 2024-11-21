"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { sidebarLinks } from "../constants/index";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="bg-dark-1 w-[264px] h-screen overflow-y-auto fixed">
      {sidebarLinks.map((sidebarLink) => (
        <Link
          href={sidebarLink.root}
          key={sidebarLink.label}
          className={`text-white px-7 py-4 flex items-center ${
            pathName === sidebarLink.root &&
            "shadow-xl bg-[#17183B] rounded-[15px]"
          }`}
        >
          <sidebarLink.Icon className="w-8 h-8 text-white pr-3" />
          <p className="font-semibold">{sidebarLink.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
