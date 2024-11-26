"use client";

import { useToast } from "@/components/ui/use-toast";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserInfo from "./useUserInfo";

export const useNewMeetingRoom = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { user, errorResponse, accessToken } = useUserInfo();

  const client = useStreamVideoClient();

  const [meetInformation, setMeetInformation] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!meetInformation.dateTime) {
      toast({
        title: "Please select a date and time",
      });
      return;
    }
    if (!client || !user) return;
    try {
      if (!meetInformation.dateTime) {
        toast({
          title: "Please select a data and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create a call");

      const startsAt =
        meetInformation.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
      const description = meetInformation.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!meetInformation.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created successfully",
      });
    } catch (err) {
      console.log("Error creating meeting:", err);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_FRONT_URL}meeting/${callDetails?.id}`

  return {
    meetInformation, setMeetInformation,
    callDetails,
    createMeeting,
    meetingLink
  };
};
