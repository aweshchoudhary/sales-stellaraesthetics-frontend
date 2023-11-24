"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Icon } from "@iconify/react";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core";
import moment from "moment";
import { ActivityInterface, UserInterface } from "@/types/interface";
import {
  useGetActivitiesQuery,
  useUpdateActivityMutation,
} from "@/redux/services/activity.api";
import { useAppSelector } from "@/hooks/redux-hooks";
import { selectCurrentUser } from "@/redux/features/auth.slice";
import AddActivityPrompt from "@/components/global/prompts/activity-handler/add-activity-prompt";

type Props = {
  weekends: boolean;
};

export default function Calendar({ weekends }: Props) {
  const [updateActivity, { isLoading: isActivityUpdating }] =
    useUpdateActivityMutation();

  const { data, isLoading, isFetching, isSuccess } = useGetActivitiesQuery({
    data: true,
    populate: "deals contacts performer",
  });

  // const { data: loggedUser } = useGetMeQuery();
  const loggedUser: UserInterface = useAppSelector(selectCurrentUser);

  const [isActivityModelOpen, setIsActivityModelOpen] = useState(false);
  const [clickedActivityData, setClickedActivityData] = useState<EventClickArg>(
    {} as EventClickArg
  );

  const [isAddActivityPromptOpen, setAddActivityPromptOpen] = useState(false);

  const [selectedInfo, setSelectedInfo] = useState<DateSelectArg>(
    {} as DateSelectArg
  );

  const [events, setEvents] = useState<any[]>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedInfo(selectInfo);
    setAddActivityPromptOpen(true);
    console.log(selectInfo);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setClickedActivityData(clickInfo);
    setIsActivityModelOpen(true);
  };

  const handleEventDrop = async (eventInfo: EventDropArg) => {
    const event = eventInfo.event;
    const updateData = {
      startDateTime: event.start,
      endDateTime: event.end,
    };
    await updateActivity({ id: event.id, update: updateData });
  };

  function filteredActivities() {
    const arr: any = data;
    const convertedData = convertData([...arr]);
    setEvents(convertedData);
    setIsActivityModelOpen(false);
  }

  useEffect(() => {
    let isMounted = true;
    const arr: any = data;
    arr?.length && isMounted && filteredActivities();

    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <section
      className={`w-full text-sm ${
        !isLoading && !isFetching && !isActivityUpdating
          ? "opacity-100"
          : "opacity-50"
      }`}
    >
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        initialView="dayGridMonth"
        editable={loggedUser?.role !== "member" ? true : false}
        selectable={loggedUser?.role !== "member" ? true : false}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekends}
        events={events}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        // eventResize={handleEventDrop}
      />

      <AddActivityPrompt
        dateSelectRange={{
          startDateTime: selectedInfo.start,
          endDateTime: selectedInfo.end,
        }}
        setOpen={setAddActivityPromptOpen}
        open={isAddActivityPromptOpen}
      />
    </section>
  );
}

interface EventInfo extends EventContentArg {
  backgroundColor: string;
}

// a custom render function
function renderEventContent(eventInfo: EventInfo) {
  return <EventComponent eventInfo={eventInfo} />;
}

const EventComponent = ({ eventInfo }: { eventInfo: EventInfo }) => {
  const data = eventInfo?.event?.extendedProps.external;
  const [icon, setIcon] = useState("");

  useEffect(() => {
    switch (data?.type) {
      case "call":
        setIcon("uil:phone");
        break;
      case "meeting":
        setIcon("uil:users");
        break;
      case "email":
        setIcon("uil:envelope");
        break;
      case "task":
        setIcon("uil:envelope");
        break;

      default:
        break;
    }
  }, [data]);

  if (data)
    return (
      <>
        <button
          className={
            "flex justify-between text-left w-full gap-2 text-textColor px-2 py-1 " +
            eventInfo?.backgroundColor
          }
        >
          <div className="flex w-[calc(100%-20px)] gap-1">
            <div>
              <Icon className="text-lg" icon={icon || "mdi:calendar-task"} />
            </div>
            <p className="flex-1 truncate text-xs">{eventInfo.event.title}</p>
          </div>
          {data?.completed_on ? (
            <div className="w-[18px] h-[18px] shrink-0 rounded-full bg-primary">
              <Icon icon="uil:check" className="text-lg" />
            </div>
          ) : (
            <div className="w-[18px] h-[18px] shrink-0 rounded-full border-2"></div>
          )}
        </button>
      </>
    );
};

const convertData = (data: ActivityInterface[]) => {
  let actvitiesArr: any[] = [];
  data.forEach((event) => {
    let today = moment();
    let startDate = moment(event.startDateTime).format("YYYY-MM-DD");
    let endDate = moment(event.endDateTime).format("YYYY-MM-DD");
    let backgroundColor;

    if (today.isAfter(endDate, "day")) backgroundColor = "bg-red-600"; // Red Color
    if (today.isBefore(startDate, "day")) backgroundColor = "bg-paper"; // Gray

    if (today.isAfter(startDate, "day") && today.isBefore(endDate, "day"))
      backgroundColor = "bg-yellow-600"; // Yellow Color

    if (event.completed_on) backgroundColor = "bg-bg";

    actvitiesArr.push({
      id: event._id,
      title: event.title,
      start: event.startDateTime,
      end: event.endDateTime,
      backgroundColor,
      external: event,
    });
  });
  return actvitiesArr;
};
