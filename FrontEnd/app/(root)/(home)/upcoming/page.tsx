import CallList from "@/components/CallList";
import React from "react";

const Upcoming = () => {
  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Upcoming Meetings</h1>

      <CallList type="upcoming" />
    </div>
  );
};

export default Upcoming;
