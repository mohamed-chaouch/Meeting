'use client';

import React, { useState, useEffect } from 'react';
import CardHome from '@/components/CardHome';
import CardUpcoming from '@/components/CardUpcoming';
import NewMeetingModal from '@/components/NewMeetingModal';
import { cardHomeInformations } from '@/constants';
import moment from 'moment';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event : any) => {
      if (event.target.closest('.modal-content') === null) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="px-10 py-10 text-white">
      <div className="bg-cover bg-no-repeat bg-[url('/images/hero-background.png')] p-12 rounded-lg">
        <div className="bg-gray-50 bg-opacity-[0.1] text-white p-2 rounded-md inline-block">
          Upcoming Meeting at : 12:30 AM
        </div>
        <div className='pt-24'>
          <div className="flex">
            <h1 className="font-bold text-5xl">{moment(new Date()).format("hh:mm")}</h1>
            <p className="font-semibold text-xl pl-3 pt-5 text-gray-400">{moment(new Date()).format('A')}</p>
          </div>
          <p className="font-semibold text-xl text-gray-400">{moment(new Date()).format('dddd, D MMMM YYYY')}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between pt-4">
        {cardHomeInformations.map((cardHome, index) => (
          <CardHome 
            key={cardHome.title} 
            color={cardHome.color} 
            srcIcon={cardHome.srcIcon} 
            title={cardHome.title} 
            description={cardHome.description} 
            handleClick={cardHome.title === "New Meeting" ? handleCardClick : cardHome.handleClick} 
          />
        ))}
      </div>
      <div className="flex px-3 pt-6 pb-2">
        <p className="font-semibold flex-1">Today&apos;s Upcoming Meetings</p>
        <p className="text-gray-300">See all</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <CardUpcoming />
        <CardUpcoming />
        <CardUpcoming />
      </div>
      {isModalOpen && <NewMeetingModal closeModal={closeModal} />}
    </div>
  );
}

export default Home;
