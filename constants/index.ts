const sidebarLinks = [
    {
        label:"Home",
        root:"/",
        icon: "icons/Home.svg"
    },
    {
        label:"Upcoming",
        root:"/upcoming",
        icon: "icons/upcoming.svg"
    },
    {
        label:"Previous",
        root:"/previous",
        icon: "icons/previous.svg"
    },
    {
        label:"Recordings",
        root:"/recordings",
        icon: "icons/recordings.svg"
    },
    {
        label:"Personal Room",
        root:"/personal-room",
        icon: "icons/add-personal.svg"
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