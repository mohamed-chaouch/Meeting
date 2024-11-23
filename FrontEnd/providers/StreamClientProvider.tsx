"use client";

import { tokenProvider } from "@/actions/stream.action";
import Loader from "@/components/Loader";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import axios from "../utils/axios";
import useUserInfo from "@/hooks/useUserInfo";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;


const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  
  const { user, errorResponse, accessToken } = useUserInfo();

  useEffect(() => {
    const initializeClient = async () => {
      if (user && apiKey) {
        try {
          const token = await tokenProvider(user);
          const client = new StreamVideoClient({
            apiKey: apiKey,
            user: {
              id: user._id,
              name: user.username,
              image: user.imageUrl,
            },
            tokenProvider: () => Promise.resolve(token),
          });
          setVideoClient(client);
        } catch (error) {
          console.error("Error initializing video client:", error);
        }
      }
    };

    initializeClient();
  }, [user]);

  if (!videoClient) return <Loader />

  return (
    <StreamVideo client={videoClient}>{children}</StreamVideo>
  );
};

export default StreamVideoProvider;
