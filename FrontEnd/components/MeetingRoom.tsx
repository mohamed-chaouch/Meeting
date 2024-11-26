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
import React, { useState } from "react";
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

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = ({ call }: { call: Call }) => {
  const router = useRouter();
  //query comming from the url
  //if it contain a query with the name "personal" that mean the person connected is the owner of the room
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

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

  console.log(call.state, " call.state");

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn(
            "h-[calc(100vh-86px)] ml-2 bg-dark-1 p-4 rounded-[20px]",
            {
              hidden: !showParticipants,
              "show-block": showParticipants,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-3 flex-wrap">
          <CallControls
                onLeave={async () => {
                  try {
                    // Check if the call state is not already left
                    if (call?.state === ("joined" as any)) {
                      await call.camera.disable();
                      await call.microphone.disable();
                      await call.leave(); // Leave the call only if it's in the "joined" state
                    }
                    router.push("/home"); // Redirect after leaving the call
                  } catch (error) {
                    console.error("Error leaving the call:", error);
                  }
                }}
          />

          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="bg-[#19232d] bg-opacity-[1] p-2 rounded-[50%] hover:bg-[#19232d] hover:bg-opacity-[0.7]">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white">
              {["grid", "speaker-left", "speaker-right"].map((item, index) => {
                return (
                  <div key={index}>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setLayout(item as CallLayoutType);
                      }}
                    >
                      {item}
                    </DropdownMenuItem>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button
            onClick={() => {
              setShowParticipants((prev) => !prev);
            }}
          >
            <div className="cursor-pointer bg-[#19232d] bg-opacity-[1] p-2 rounded-[50%] hover:bg-[#19232d] hover:bg-opacity-[0.7]">
              <Users size={20} />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
