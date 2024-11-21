import { Home, CalendarClock, CalendarCheck2, Video, User } from "lucide-react";

const sidebarLinks = [
    {
        label:"Home",
        root:"/home",
        Icon: Home
    },
    {
        label:"Upcoming",
        root:"/upcoming",
        Icon: CalendarClock
    },
    {
        label:"Previous",
        root:"/previous",
        Icon: CalendarCheck2
    },
    {
        label:"Recordings",
        root:"/recordings",
        Icon: Video
    },
    {
        label:"Personal Room",
        root:"/personal-room",
        Icon: User
    },
];

const cardHomeInformations = [
    {
        color: "orange",
        srcIcon: "icons/add-meeting.svg",
        title: "New Meeting",
        description: "Setup a new recording",
        handleClick: () => {
            
        }
    },
    {
        color: "blue",
        srcIcon: "icons/join-meeting.svg",
        title: "Join Meeting",
        description: "Via invitation link",
        handleClick: () => {

        }
    },
    {
        color: "purple",
        srcIcon: "icons/schedule.svg",
        title: "Schedule Meeting",
        description: "Plan your meeting",
        handleClick: () => {

        }
    },
    {
        color: "yellow",
        srcIcon: "icons/recordings.svg",
        title: "View Recordings",
        description: "Meeting recordings",
        handleClick: () => {

        }
    },
]

export {sidebarLinks, cardHomeInformations};