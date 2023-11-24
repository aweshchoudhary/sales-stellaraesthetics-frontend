import { ActivityInterface } from "@/types/interface";
import React from "react";
import ActivityCard from "./cards/ActivityCard";

type Props = {
  activities: any;
};

export default function ActivitiesTab({ activities }: Props) {
  if (activities.isLoading) return <p>Loading...</p>;

  if (activities.isSuccess)
    return activities.data.length ? (
      <ul className="flex flex-col gap-2">
        {activities.data.map((activity: ActivityInterface, index: number) => (
          <li key={index}>
            <ActivityCard activity={activity} />
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center">No Activities to show</p>
    );
}
