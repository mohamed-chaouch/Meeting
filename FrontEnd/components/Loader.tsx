import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex items-center justify-center">
      <img src="/icons/logo.svg" alt="Meeting" className="m-0 w-11 h-11"/>
        <h1 className="pl-2 text-2xl font-bold text-white">Meeting</h1>
      </div>
    </div>
  );
};

export default Loader;
