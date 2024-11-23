"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

const MeetingModal = ({
  meetingState,
  isOpen,
  onClose,
  title,
  BtnTitle,
  handleClick,
}: {
  meetingState:
    | "isJoiningMeeting"
    | "isInstantMeeting"
    | "isScheduleMeeting"
    | undefined;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  BtnTitle: string;
  handleClick: () => void;
}) => {
  const router = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[10px] md:rounded-[10px] border-0 p-4">
        <DialogHeader>
          <DialogTitle className="text-start font-bold text-lg mt-4 mb-2">
            {title}
          </DialogTitle>
          <button
            className="bg-dark-1 hover:bg-dark-3 text-white mt-4 p-2 rounded w-full"
            onClick={handleClick}
          >
            {BtnTitle}
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
