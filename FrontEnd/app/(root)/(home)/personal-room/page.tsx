"use client";

import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import useUserInfo from "@/hooks/useUserInfo";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-8 text-black">
      <h1 className="font-bold">{title}</h1>
      <h1 className="truncate font-semibold">{description}</h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUserInfo();
  const meetingId = user?._id;
  const meetingLink = `${process.env.NEXT_PUBLIC_FRONT_URL}meeting/${user?._id}?personal=true`;

  const { toast } = useToast();

  const streamClient = useStreamVideoClient();

  const { call } = useGetCallById(meetingId);

  const startRoom = async () => {
    if (!streamClient || !user) return;

    if (!call) {
      const newCall = streamClient.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  };
  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Personal Room</h1>
      <Table title="Topic : " description={`${user?.username}'s meeting room`} />
      <Table title="Meeting ID : " description={meetingId} />
      <Table title="Invite Link : " description={meetingLink} />
      <div className="flex items-center gap-2 mt-8">
        <Button className="" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="flex items-center justify-center"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          <img
            src="/icons/copy.svg"
            alt="copy"
            width={16}
            height={16}
            className="mr-2"
          />
          Copy Invitation
        </Button>
      </div>
    </div>
  );
};

export default PersonalRoom;
