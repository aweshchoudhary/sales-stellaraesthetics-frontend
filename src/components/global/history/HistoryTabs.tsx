import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivitiesTab from "./ActivitiesTab";
import NotesTab from "./NotesTab";
import AllHistoryTab from "./AllHistoryTab";
import FilesTab from "./FileTab";

type Props = {
  activities: any;
  notes: any;
  files: any;
};

export default function HistoryTabs({ activities, notes, files }: Props) {
  return (
    <section>
      <h2 className="text-xl mb-5 font-semibold">History</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="border p-5 rounded">
          <AllHistoryTab notes={notes} activities={activities} files={files} />
        </TabsContent>
        <TabsContent value="notes" className="border p-5 rounded">
          <NotesTab notes={notes} />
        </TabsContent>
        <TabsContent value="activities" className="border p-5 rounded">
          <ActivitiesTab activities={activities} />
        </TabsContent>
        <TabsContent value="files" className="border p-5 rounded">
          <FilesTab files={files} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
