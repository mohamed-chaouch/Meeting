"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export const useHomeCard = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isInstantMeeting" | "isScheduleMeeting" | undefined
  >();

  return {
    router,
    meetingState,
    setMeetingState,
  };
};
