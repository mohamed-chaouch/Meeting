"use client";

import Image from "next/image";
import React from "react";

const CardHome = ({
  srcIcon,
  title,
  description,
  handleClick,
}: {
  srcIcon: string;
  title: string;
  description: string;
  handleClick: () => void;
}) => {
  return (
    <div
      className="transform cursor-pointer hover:scale-[1.03] transition duration-300 w-full rounded-lg p-4 bg-gradient-blue"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <div className="bg-dark-3 p-3 rounded-full shadow-2xl">
          <Image src={srcIcon} alt={title} width={32} height={32} className="" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-700">{title}</h1>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
