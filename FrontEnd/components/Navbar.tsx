"use client";

import { LogOut, Menu } from "lucide-react";
import axios from "../utils/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SidebarMobile from "./SidebarMobile";
import useUserInfo from "@/hooks/useUserInfo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import api from "../utils/axios";

const Navbar = () => {
  const { user, errorResponse, accessToken } = useUserInfo();

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const logOut = async () => {
    await api.get("/logout", {
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    // Remove the accessToken cookie
    // the path is / because i put in the cookies the path equal to /
    removeCookie("accessToken", { path: "/" });

    router.push("/");
  };

  return (
    <div className="bg-dark-1 text-white p-3 flex justify-between items-center">
      <div className="flex items-center cursor-pointer" onClick={()=>{
        router.push("/home")
      }}>
        <Image src="/icons/logo.svg" alt="Yoom" width={36} height={36} />
        <p className="pl-2 font-bold hidden sm:block">MEETING</p>
      </div>
      <div className="flex items-center">
        {user && user.imageUrl && (
          <img
            src={user.imageUrl.startsWith("http") ? user.imageUrl : `${process.env.NEXT_PUBLIC_BASE_URL}${user.imageUrl}`}
            alt="avatar"
            className="rounded-full sm:mr-4"
            width={36}
            height={36}
          />
        )}

        <span onClick={logOut}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mx-1 sm:mr-8 cursor-pointer p-2 w-[40px] h-[100%] rounded-[50%] hover:bg-[#17183B]">
                  <LogOut className="w-6 h-6 text-white hover:cursor-pointer" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-white bg-black border-0">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>

        <SidebarMobile />
      </div>
    </div>
  );
};

export default Navbar;
