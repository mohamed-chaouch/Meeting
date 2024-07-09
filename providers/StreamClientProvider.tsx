"use client";

import { tokenProvider } from '@/actions/stream.action';
import Loader from '@/components/Loader';
import {
    // StreamCall,
    StreamVideoClient,
    StreamVideo,
    // StreamVideoClient,
    // User,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
  
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });
interface userProps {
    _id : string,
    username : string,
    imageUrl : string,
}
const StreamVideoProvider = ({children}: { children: ReactNode}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const [user, setUser]=  useState<userProps>();
    useEffect(()=>{
        if(!user) return;
        if(!apiKey) throw new Error("Stream API key Missing")
        const client = new StreamVideoClient({ 
            apiKey, 
            user: {
                id : user?._id,
                name: user?.username,
                image: user?.imageUrl,
            },
            tokenProvider: tokenProvider
        });

        setVideoClient(client);
    },[user]);

    return (
        !videoClient ?
            <Loader /> 
        :
            <StreamVideo client={videoClient}>
                {children}
            </StreamVideo>
    );
  };

export default StreamVideoProvider