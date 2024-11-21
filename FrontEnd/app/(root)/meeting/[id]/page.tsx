'use client'

import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import axios from '../../../../utils/axios';
import React, { useEffect, useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const Meeting = ({params : {id}}:{params:{id : string}}) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token : any = localStorage.getItem('token');
    const accessUser = JSON.parse(atob(token.split(".")[1]));

    const handleUser = () => {
      axios.get(`get-user/${accessUser._id}`)
        .then((res)=>{
          setUser(res.data.user);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }

    if (accessUser._id) {
      handleUser();
    }
  }, []);

  const { call, isCallLoading } = useGetCallById(id);

  if (isCallLoading) return <Loader />;
  if (!call) return <div>Error loading call</div>;

  return (
    <div className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
}

export default Meeting;
