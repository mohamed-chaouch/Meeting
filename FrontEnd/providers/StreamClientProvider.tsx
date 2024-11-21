"use client";

import { tokenProvider } from "@/actions/stream.action";
import Loader from "@/components/Loader";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import axios from "../utils/axios";

const apiKey: string | undefined = process.env.NEXT_PUBLIC_STREAM_API_KEY;

interface UserProps {
  _id: string;
  username: string;
  imageUrl: string;
}

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    const parsedData = JSON.parse(atob(token.split(".")[1]));

    const handleUser = async () => {
      try {
        const res = await axios.get(`get-user/${parsedData._id}`);
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (parsedData._id) {
      handleUser();
    }
  }, []);

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

  return videoClient === null ? (
    <Loader />
  ) : (
    <StreamVideo client={videoClient}>{children}</StreamVideo>
  );
};

export default StreamVideoProvider;
