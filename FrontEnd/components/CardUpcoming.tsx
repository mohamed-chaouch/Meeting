import moment from "moment";
import Image from "next/image";
import React from "react";

const CardUpcoming = () => {
  return (
    // Meeting Upcoming Cards
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {[1, 2, 3, 4].map((meeting, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            {/* Left: Icon + Details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              {/* Icon */}
              <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
                <div className="bg-purple-800 p-3 rounded-lg shadow-inner">
                  <Image
                    src="/icons/schedule.svg"
                    alt="Calendar Icon"
                    width={28}
                    height={28}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col text-center sm:text-left">
                <h3 className="font-semibold text-md break-words">
                  Project Title: Dynamic Meeting {index + 1}
                </h3>
                <p className="text-sm opacity-90 mt-2">
                  {moment(new Date()).format("dddd, D MMM YYYY - hh:mm A")}
                </p>
              </div>
            </div>

            {/* Right: Participants */}
            <div className="flex justify-center sm:justify-end mt-4 sm:mt-0 -space-x-2">
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="/images/avatar-1.jpeg"
                alt="Participant 1"
                width={40}
                height={40}
              />
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="/images/avatar-2.jpeg"
                alt="Participant 2"
                width={40}
                height={40}
              />
              <div className="w-10 h-10 bg-white text-gray-700 text-sm flex items-center justify-center font-medium rounded-full">
                +2
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardUpcoming;
