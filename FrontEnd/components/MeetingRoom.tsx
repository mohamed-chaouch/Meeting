"use client";

import { cn } from "@/lib/utils";
import {
  Call,
  CallControls,
  CallingState,
  CallParticipantsList,
  CallState,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = ({ call }: { call: Call }) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  //query comming from the url
  //if it contain a query with the name "personal" that mean the person connected is the owner of the room
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (isSmallScreen) {
      setLayout("grid");
    }
  }, [isSmallScreen]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
<div
  className={cn(
    "w-full h-[calc(100vh-86px)] gap-4",
    showParticipants
      ? isSmallScreen
        ? "grid grid-rows-[3fr_2fr]" // Adjusted row height proportions
        : "grid grid-cols-[3fr_1fr]"
      : "grid grid-cols-1"
  )}
>
  {/* Call Layout (Main Content) */}
  <div
    className={cn(
      "w-full flex items-center justify-center",
      showParticipants
        ? isSmallScreen
          ? "row-span-1"
          : "col-span-1"
        : "col-span-1 md:col-span-2"
    )}
  >
    <div className="w-full max-w-[1000px]">
      <CallLayout />
    </div>
  </div>

  {/* Participants Section */}
  {showParticipants && (
    <div
      className={cn(
        "bg-dark-1 p-4 rounded-[20px] overflow-auto flex justify-center w-full",
        isSmallScreen ? "row-span-1 min-h-full w-64 m-auto" : "col-span-1 max-w-[300px]"
      )}
    >
      <CallParticipantsList onClose={() => setShowParticipants(false)} />
    </div>
  )}
</div>


      {/* Bottom Controls */}
      <div className="fixed bottom-0 w-full flex items-center justify-center gap-3 flex-wrap bg-dark-2 p-2">
        <CallControls
          onLeave={async () => {
            try {
              if (call?.state === ("joined" as any)) {
                await call.camera.disable();
                await call.microphone.disable();
                await call.leave();
              }
              router.push("/home");
            } catch (error) {
              console.error("Error leaving the call:", error);
            }
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden sm:flex bg-[#19232d] p-2 rounded-full hover:bg-opacity-70">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white">
            {["grid", "speaker-left", "speaker-right"].map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setLayout(item as CallLayoutType)}
                className="cursor-pointer"
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="bg-[#19232d] p-2 rounded-full hover:bg-opacity-70"
        >
          <Users size={20} />
        </button>
        {!isPersonalRoom && <EndCallButton />}

      </div>
    </section>
  );
};

export default MeetingRoom;
