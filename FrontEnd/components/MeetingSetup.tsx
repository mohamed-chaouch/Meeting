"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within StreamCall Component");
  }

  useEffect(() => {
    // Toggle mic and camera during the setup phase only
    if (isMicCamToggledOn) {
      call.camera.enable();
      call.microphone.enable();
    } else {
      call.camera.disable();
      call.microphone.disable();
    }

    // Cleanup effect to reset the state when the component unmounts
    // return () => {
    //     call.camera.enable();
    //     call.microphone.enable();
    // };
  }, [isMicCamToggledOn, call]);

  return (
    <div className="w-full h-screen flex items-center justify-center gap-3 text-white">
      <div className="block">
        <h1 className="text-center font-bold text-2xl mb-4 text-green-200">Setup</h1>
          <VideoPreview className="border-0" />
        <div className="flex items-center justify-center mt-4">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => {
              setIsMicCamToggledOn(e.target.checked);
            }}
          />
          <label className="ml-2 mr-6">Join with mic and camera on</label>
          <DeviceSettings />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-white font-bold text-sm text-green-500 py-2 px-4 rounded mt-3"
            onClick={() => {
              setIsMicCamToggledOn(false);
              call.join();
              setIsSetupComplete(true);
            }}
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;
