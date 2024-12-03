"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Image from "next/image";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarMobile = () => {
  const pathName = usePathname();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer p-2 w-[40px] h-[100%] rounded-[50%] hover:bg-[#17183B] flex sm:hidden">
                  <Menu className="text-white hover:cursor-pointer sm:hidden" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-white bg-black border-0">
                <p>Menu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 bg-dark-1 w-[264px] overflow-y-auto size-[264px] h-screen"
        >
          <div className="pl-4 pt-5 flex flex-row items-center bg-dark-1 mb-10">
            <Image src="/icons/logo.svg" alt="Yoom" width={24} height={24} />
            <p className="pl-2 font-bold text-white">MEETING</p>
          </div>
          {sidebarLinks.map((sidebarLink) => (
            <SheetClose key={sidebarLink.label} asChild>
              <Link
                href={sidebarLink.root}
                className={`text-white px-7 py-4 flex items-center ${
                  pathName === sidebarLink.root &&
                  "shadow-xl bg-[#17183B] rounded-[15px]"
                }`}
              >
                <sidebarLink.Icon className="w-8 h-8 text-white pr-3" />
                <p className="font-semibold">{sidebarLink.label}</p>
              </Link>
            </SheetClose>
          ))}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SidebarMobile;
