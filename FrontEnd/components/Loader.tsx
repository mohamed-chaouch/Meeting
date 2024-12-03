import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex items-center justify-center">
        <Image
          src="/icons/logo.svg"
          alt="loading circle"
          width={70}
          height={70}
          className="animate-pulse"
        />
        <h1 className="text-2xl font-bold text-white">Meeting</h1>
      </div>
    </div>
  );
};

export default Loader;
