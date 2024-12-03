import CallList from "@/components/CallList";
import React from "react";

const Recordings = () => {
  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Recordings</h1>
      <CallList type="recordings" />
    </div>
  );
};

export default Recordings;
