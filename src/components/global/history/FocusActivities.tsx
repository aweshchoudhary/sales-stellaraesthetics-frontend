import React from "react";
import ActivityCard from "./cards/ActivityCard";
import { useGetActivitiesQuery } from "@/redux/services/activityApi";
import { ActivityInterface } from "@/types/interface";

type Props = {
  dealId?: string;
  contactId?: string;
};

export default function FocusActivities({ dealId, contactId }: Props) {
  const query = {
    filters: JSON.stringify([
      {
        id: dealId ? "deals" : "contacts",
        value: { $in: dealId ? [dealId] : [contactId] },
      },
      { id: "completed_on", value: null },
    ]),
    data: true,
    populate: "performer contacts deals",
  };
  const { data, isLoading, isFetching, isSuccess } =
    useGetActivitiesQuery(query);

  if (isSuccess)
    return (
      <section className="my-5">
        <h2 className="text-xl font-semibold mb-5">Focus Activity</h2>
        {data.length ? (
          <ul className="flex flex-col gap-3">
            {data.map((activity: ActivityInterface, i: number) => (
              <li key={i}>
                <ActivityCard activity={activity} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-10 border rounded flex items-center justify-center">
            No data to show
          </div>
        )}
      </section>
    );
}
