"use client";
import GoBack from "@/components/global/GoBack";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import DealSidebar from "./_components/deal-sidebar";
import TabsContainer from "./_components/TabsContainer";
import { useParams } from "next/navigation";
import { useLazyGetDealQuery } from "@/redux/services/dealApi";
import FocusActivities from "@/components/global/history/FocusActivities";
import HistoryTabs from "@/components/global/history/HistoryTabs";
import { useLazyGetNotesQuery } from "@/redux/services/noteApi";
import { useLazyGetActivitiesQuery } from "@/redux/services/activityApi";
import { useLazyGetFilesQuery } from "@/redux/services/fileApi";
import { ContactInterface } from "@/types/interface";

type Props = {};

export default function DealPage({}: Props) {
  const { dealId } = useParams();
  const [getDeal, { data, isLoading, isSuccess }] = useLazyGetDealQuery();

  useEffect(() => {
    let isMounted = true;
    const handleGetDeal = async (dealId: any) =>
      await getDeal({ id: dealId, params: { populate: "contacts" } });
    dealId && isMounted && handleGetDeal(dealId);
    return () => {
      isMounted = false;
    };
  }, [dealId, getDeal]);

  if (isSuccess)
    return (
      <div className="flex flex-col h-full">
        <section className="px-5 py-3 border-b">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GoBack />
              <h1 className="text-lg font-semibold">{data.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-green-600 hover:bg-green-900">Won</Button>
              <Button variant="destructive">Lost</Button>
              <Button className="text-red-600" variant="outline">
                Delete
              </Button>
            </div>
          </header>
        </section>
        <section className="flex-1 flex items-stretch">
          <DealSidebar deal={data} />
          <div className="py-5 px-10 flex-1 h-full overflow-y-auto border-l">
            <TabsContainer
              deals={[{ label: data.title, value: data._id }]}
              contacts={data.contacts.map((item: ContactInterface) => {
                return {
                  label: `${item.company} (${item.contactPerson})`,
                  value: item._id,
                };
              })}
              pipelineId={data.pipelineId}
            />
            <FocusActivities dealId={data._id} />
            <HistoryTabsContainer dealId={data._id} />
          </div>
        </section>
      </div>
    );
}

const HistoryTabsContainer = ({ dealId }: { dealId: string }) => {
  const [loading, setLoading] = useState(false);

  const [getNotes, notesStates] = useLazyGetNotesQuery();
  const [getActivities, activitiesStates] = useLazyGetActivitiesQuery();
  const [getFiles, filesStates] = useLazyGetFilesQuery();

  useEffect(() => {
    let isMounted = true;
    const fetchHistories = async () => {
      setLoading(true);
      await getNotes({
        filters: JSON.stringify([{ id: "deals", value: { $in: [dealId] } }]),
        data: true,
        populate: "creator deals contacts",
      });
      await getActivities({
        filters: JSON.stringify([
          { id: "deals", value: { $in: [dealId] } },
          { id: "completed_on", value: { $not: { $eq: null } } },
        ]),
        data: true,
        populate: "performer deals contacts",
      });
      await getFiles({
        filters: JSON.stringify([{ id: "dealId", value: { $in: [dealId] } }]),
        data: true,
        populate: "uploader",
      });
      setLoading(false);
    };
    isMounted && fetchHistories();
    return () => {
      isMounted = false;
    };
  }, [dealId, getActivities, getFiles, getNotes]);

  return (
    <HistoryTabs
      activities={activitiesStates}
      notes={notesStates}
      files={filesStates}
    />
  );
};
