import CallList from "@/components/CallList";
import React from "react";

const Previous = () => {
  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Previous Meetings</h1>
      <CallList type="previous" />
    </div>
  );
};

export default Previous;
