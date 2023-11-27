"use client";
import GoBack from "@/components/global/GoBack";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import DealSidebar from "./_components/deal-sidebar";
import TabsContainer from "./_components/TabsContainer";
import { useParams, useRouter } from "next/navigation";
import FocusActivities from "@/components/global/history/FocusActivities";
import HistoryTabs from "@/components/global/history/HistoryTabs";
import { ContactInterface, SelectInterface } from "@/types/interface";

import {
  useDeleteDealMutation,
  useLazyGetDealQuery,
} from "@/redux/services/deal.api";
import { useLazyGetNotesQuery } from "@/redux/services/note.api";
import { useLazyGetActivitiesQuery } from "@/redux/services/activity.api";
import { useLazyGetFilesQuery } from "@/redux/services/file.api";
import { toast } from "react-toastify";
import { useGetContactsQuery } from "@/redux/services/contact.api";

type Props = {};

export default function DealPage({}: Props) {
  const { dealId } = useParams();
  const [getDeal, { data, isLoading, isSuccess }] = useLazyGetDealQuery();
  const [deleteDeal, deleteStates] = useDeleteDealMutation();
  const contactsRes = useGetContactsQuery({
    filters: {
      filters: JSON.stringify([
        { id: "deals", value: { in: data?.contacts ?? [] } },
      ]),
    },
  });

  const [contacts, setContacts] = useState<SelectInterface[]>([]);

  const router = useRouter();

  const handleDeleteDeal = async () => {
    try {
      await deleteDeal(dealId);
      toast.success("Deal deleted successfully");
      router.back();
    } catch (err) {
      toast.error("Error while deleting deal");
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const handleGetDeal = async (dealId: any) =>
      await getDeal({
        id: dealId,
      });
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
              <h1 className="text-lg font-semibold">{data.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-green-600 hover:bg-green-900">Won</Button>
              <Button variant="destructive">Lost</Button>
              <Button
                className="text-red-600"
                onClick={handleDeleteDeal}
                variant="outline"
              >
                {deleteStates.isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </header>
        </section>
        <section className="flex-1 flex items-stretch">
          <DealSidebar deal={data} />
          <div className="py-5 px-10 flex-1 h-full overflow-y-auto border-l">
            {/* <TabsContainer
              deals={[{ label: data.name, value: data.id }]}
              contacts={contactsRes?.data?.data?.map(
                (contact: ContactInterface) => ({
                  label: contact.contactPerson,
                  value: contact.id,
                })
              )}
              pipelineId={data.pipelineId}
            /> */}
            {/* <FocusActivities dealId={data.id} /> */}
            <HistoryTabsContainer dealId={data.id} />
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
        filters: JSON.stringify([
          { id: "deals", value: { hasSome: [dealId] } },
        ]),
      });
      await getActivities({
        filters: JSON.stringify([
          { id: "deals", value: { hasSome: [dealId] } },
        ]),
      });
      // await getFiles({
      //   filters: JSON.stringify([{ id: "dealId", value: { in: [dealId] } }]),
      // });
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
