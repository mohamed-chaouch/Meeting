"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useGetCalls } from "@/hooks/useGetCalls";
import Loader from "./Loader";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { CalendarCheck2, CalendarClock, Play, Video } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

const CallList = ({
  type,
}: {
  type: "upcoming" | "previous" | "upcomingToday" | "recordings";
}) => {
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const {
    previousCalls,
    upcomingCalls,
    upcomingCallsToday,
    callRacordings,
    isLoading,
  } = useGetCalls();

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRacordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (err) {
        toast({
          title: "Try again later",
        });
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRacordings]);

  // Determine calls based on type
  const calls =
    type === "previous"
      ? previousCalls
      : type === "upcoming"
      ? upcomingCalls
      : type === "upcomingToday"
      ? upcomingCallsToday
      : type === "recordings"
      ? recordings
      : [];

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {type === "previous" && previousCalls.length === 0 ? (
        <h1 className="text-black text-sm font-semi-bold">No Previous Calls</h1>
      ) : type === "upcoming" && upcomingCalls.length === 0 ? (
        <h1 className="text-black text-sm font-semi-bold">No Upcoming Calls</h1>
      ) : type === "upcomingToday" && upcomingCallsToday.length === 0 ? (
        <h1 className="text-black text-sm font-semi-bold">
          No Upcoming Calls Today
        </h1>
      ) : (
        type === "recordings" &&
        callRacordings.length === 0 && (
          <h1 className="text-black text-sm font-semi-bold">No Recordings</h1>
        )
      )}
      {calls.map((meeting: Call | CallRecording, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            {/* Left: Icon + Details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              {/* Icon */}
              <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
                <div className="bg-purple-800 p-3 rounded-lg shadow-inner">
                  {type === "upcoming" || type === "upcomingToday" ? (
                    <CalendarClock className="w-8 h-8" />
                  ) : type === "previous" ? (
                    <CalendarCheck2 className="w-8 h-8" />
                  ) : (
                    type === "recordings" && <Video className="w-8 h-8" />
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col text-center sm:text-left">
                <h3 className="font-semibold text-md break-words">
                  {(meeting as Call).state?.custom?.description?.substring(
                    0,
                    26
                  ) ||
                    (meeting as CallRecording)?.filename?.substring(0, 26) ||
                    "Personal Meeting"}
                </h3>
                <p className="text-sm opacity-90 mt-2">
                  {(meeting as Call).state?.startsAt?.toLocaleString() ||
                    moment((meeting as CallRecording).start_time).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                </p>
              </div>
            </div>

            {/* Right: Participants */}
            {/* <div className="flex justify-center sm:justify-end mt-4 sm:mt-0 -space-x-2">
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="/images/avatar-1.jpeg"
                alt="Participant 1"
                width={40}
                height={40}
              />
              <Image
                className="w-10 h-10 border-2 border-white rounded-full"
                src="/images/avatar-2.jpeg"
                alt="Participant 2"
                width={40}
                height={40}
              />
              <div className="w-10 h-10 bg-white text-gray-700 text-sm flex items-center justify-center font-medium rounded-full">
                +2
              </div>
            </div> */}
          </div>
          {(type === "upcoming" ||
            type === "upcomingToday" ||
            type === "recordings") && (
            <div className="flex items-center gap-2 mt-4">
              <Button
                className="flex items-center justify-center"
                onClick={() => {
                  type === "recordings"
                    ? router.push(`${(meeting as CallRecording).url}`)
                    : router.push(`/meeting/${(meeting as Call).id}`);
                }}
              >
                {type === "recordings" && <Play className="w-4 h-4 mr-2" />}
                {type === "recordings" ? "Play" : "Start"}
              </Button>
              <Button
                className="flex items-center justify-center"
                onClick={() => {
                  navigator.clipboard.writeText(
                    type === "recordings"
                      ? (meeting as CallRecording).url
                      : `${process.env.NEXT_PUBLIC_FRONT_URL}meeting/${
                          (meeting as Call).id
                        }`
                  );
                  toast({
                    title: "Link Copied",
                  });
                }}
              >
                <Image
                  src="/icons/copy.svg"
                  alt="copy"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Copy Invitation
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CallList;
