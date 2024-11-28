"use client";

import CardHome from "@/components/CardHome";
import { cardHomeInformations } from "@/constants";
import moment from "moment";
import { useNewMeetingRoom } from "@/hooks/useNewMeetingRoom";
import { useHomeCard } from "@/hooks/useHomeCards";
import MeetingModal from "@/components/MeetingModal";
import { useToast } from "@/components/ui/use-toast";
import CallList from "@/components/CallList";
import { useGetCalls } from "@/hooks/useGetCalls";

const Home = () => {
  const { router, meetingState, setMeetingState } = useHomeCard();

  const {
    meetInformation,
    setMeetInformation,
    callDetails,
    createMeeting,
    meetingLink,
  } = useNewMeetingRoom();

  const {
    soonestTime
  } = useGetCalls();

  const { toast } = useToast();

  return (
    <div className="text-white">
      <div className="relative bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 p-12 rounded-lg shadow-2xl overflow-hidden">
        {/* Decorative Blurred Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-600 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-500 rounded-full blur-[120px] opacity-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="bg-purple-950 bg-opacity-50 text-white p-3 rounded-lg inline-block">
            {`Upcoming Meeting at: ${soonestTime ? moment(soonestTime).format("DD/MM/YYYY HH:mm") : ""}`}
          </div>
          <div className="pt-20">
            <div className="flex items-baseline space-x-4">
              <h1 className="text-6xl font-bold text-white">
                {moment(new Date()).format("HH:mm")}
              </h1>
              {/* <span className="text-2xl text-gray-200">
                {moment(new Date()).format("A")}
              </span> */}
            </div>
            <p className="text-gray-300 text-lg mt-4">
              {moment(new Date()).format("dddd, D MMMM YYYY")}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardHomeInformations.map((cardHome, index) => (
          <CardHome
            key={cardHome.title}
            srcIcon={cardHome.srcIcon}
            title={cardHome.title}
            description={cardHome.description}
            handleClick={() => {
              if (cardHome.meetingState === "") {
                router.push("/recordings");
              } else {
                setMeetingState(cardHome.meetingState);
              }
            }}
          />
        ))}
      </div>
      <div className="mt-5 bg-gradient-to-b from-gray-200 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Today&apos;s Upcoming Meetings
          </h2>
        </div>

        <CallList type="upcomingToday" />
      </div>

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title="Create Meeting"
          handleClick={createMeeting}
          meetInformation={meetInformation}
          setMeetInformation={setMeetInformation}
          isScheduleMeeting={true}
        />
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title="Meeting Created"
          BtnTitle="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link copied",
            });
          }}
          image="/icons/checked.svg"
          BtnIcon="/icons/copy.svg"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Start an Instant Meeting"
        BtnTitle="Start"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Type the link here"
        BtnTitle="Join Meeting"
        handleClick={()=>{
          router.push(meetInformation.link)
        }}
        meetInformation={meetInformation}
        setMeetInformation={setMeetInformation}
        isJoiningMeeting={true}
      />
    </div>
  );
};

export default Home;
