
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode, useState } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="flex flex-1 mt-[64px]">
        <div className="hidden sm:flex">
          <Sidebar />
        </div>
        <div className="flex-1 sm:pl-[264px] overflow-y-auto m-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
