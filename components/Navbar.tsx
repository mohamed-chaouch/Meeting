import axios from '../utils/axios';
import Image from 'next/image';
import React, { useState } from 'react';

const Navbar = ({ menuClicked, setMenuClicked }: { menuClicked: boolean; setMenuClicked: Function }) => {
  const [imageUrl, setImageUrl] = useState<string | "">("");

  const token : any = localStorage.getItem("token");
  const accessUser = JSON.parse(atob(token?.split(".")[1]));
  const handleImageUserConnected = () =>{
    axios.get(`get-user/${accessUser._id}`)
      .then((res) =>{
        setImageUrl(res.data.user.imageUrl);
      })
  }
  return (
    <div className="bg-dark-1 text-white p-3 flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/icons/logo.svg" alt="Yoom" width={24} height={24} />
        <p className="pl-2 font-bold">MEETING</p>
      </div>
      <div className="flex items-center">
        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/${imageUrl}`} alt="avatar" className="rounded-full" width={36} height={36} />
        <Image
          src="/icons/hamburger.svg"
          alt="Menu"
          width={24}
          height={24}
          className="text-white hover:cursor-pointer block sm:hidden ml-4"
          onClick={() => {
            setMenuClicked(!menuClicked);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
