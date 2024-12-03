"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import Image from "next/image";
import { CalendarCog } from "lucide-react";
import { useRef } from "react";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  BtnTitle,
  image,
  BtnIcon,
  meetInformation,
  setMeetInformation,
  handleClick,
  isScheduleMeeting,
  isJoiningMeeting,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  BtnTitle?: string;
  image?: string;
  BtnIcon?: string;
  meetInformation?: {
    dateTime: Date;
    description: string;
    link: string;
  };
  setMeetInformation?: React.Dispatch<
    React.SetStateAction<{
      dateTime: Date;
      description: string;
      link: string;
    }>
  >;
  handleClick: () => void;
  isScheduleMeeting?: boolean;
  isJoiningMeeting?: boolean;
}) => {
  const datePickerRef = useRef<ReactDatePicker | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[10px] md:rounded-[10px] border-0 p-4">
        <DialogHeader>
          {image && (
            <div className="flex items-center justify-center">
              <Image
                src={image}
                alt="meeting"
                width={50}
                height={50}
                className="mr-2"
              />
            </div>
          )}
          <DialogTitle className="font-bold text-center text-2xl mt-4 mb-2">
            {title}
          </DialogTitle>
          {meetInformation && setMeetInformation && (
            <>
              {isScheduleMeeting && (
                <div className="flex flex-col text-start text-sm font-semibold">
                  <label>Add Description</label>
                  <Textarea
                    rows={3}
                    className="w-full bg-dark-2 text-white resize-none focus:outline-none focus:ring-0"
                    onChange={(e) => {
                      setMeetInformation((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }));
                    }}
                  />
                  <div className="relative flex flex-col text-start text-sm font-semibold mb-4 mt-2">
                    <label>Select Date And Time</label>
                    <ReactDatePicker
                      ref={datePickerRef}
                      selected={meetInformation.dateTime}
                      onChange={(date) => {
                        if (date) {
                          setMeetInformation((prev) => ({
                            ...prev,
                            dateTime: date,
                          }));
                        }
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full cursor-pointer p-3 rounded-[8px] bg-dark-2 text-white focus:outline-none"
                      minDate={new Date()}
                    />
                    <div className="absolute top-8 right-4">
                      <CalendarCog
                        className="w-4 h-4 text-white cursor-pointer"
                        onClick={() => {
                          if (datePickerRef.current) {
                            datePickerRef.current.setFocus();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isJoiningMeeting && (
                <div className="flex flex-col text-start text-sm font-semibold">
                  <label className="mt-2">Link Meeting</label>
                  <input
                    placeholder="Link Meeting"
                    className="w-full bg-dark-2 text-white p-3 rounded-[8px] focus:outline-none focus:ring-0 mb-4"
                    onChange={(e) => {
                      setMeetInformation({
                        ...meetInformation,
                        link: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
            </>
          )}
          <button
            className="flex items-center justify-center bg-dark-1 hover:bg-dark-3 text-white mt-4 p-2 rounded w-full"
            onClick={handleClick}
          >
            {BtnIcon && (
              <Image
                src={BtnIcon}
                alt="icon"
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            {BtnTitle || "Schedule Meeting"}
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
