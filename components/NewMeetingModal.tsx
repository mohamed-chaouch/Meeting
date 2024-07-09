"use client"

import React from 'react';
import Image from 'next/image';

const NewMeetingModal = ({ closeModal } : {closeModal : () => void}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 rounded-[12px]">
      <div className="modal-content bg-dark-2 shadow-lg rounded-lg p-14 relative text-center text-white">
        <button onClick={closeModal} className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Image src="icons/close.svg" alt="Close Icon" width={24} height={24} />
        </button>
        <h1 className='text-2xl'>Start an Instant Meeting</h1>
        <button className="bg-blue-1 mt-4 p-2 rounded w-full">Start Meeting</button>
      </div>
    </div>
  );
};

export default NewMeetingModal;
