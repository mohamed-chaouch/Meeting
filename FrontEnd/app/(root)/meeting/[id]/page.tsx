'use client'

import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import axios from '../../../../utils/axios';
import React, { useEffect, useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';
import useUserInfo from '@/hooks/useUserInfo';

const Meeting = ({params : {id}}:{params:{id : string}}) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  const { user, errorResponse, accessToken } = useUserInfo();

  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading) return <Loader />;
  if (!call) return <div>Error loading call</div>;
  

  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom call={call} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
