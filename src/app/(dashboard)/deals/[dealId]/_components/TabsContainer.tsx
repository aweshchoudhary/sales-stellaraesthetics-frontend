import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddActivity from "@/components/global/prompts/activity-handler/add-activity";
import AddNote from "@/components/global/prompts/note-handler/add-note";
import AddFile from "@/components/global/prompts/file-handler/add-file";

type Props = {
  pipelineId: string;
  deals: any;
  contacts: any;
};

export default function TabsContainer({ pipelineId, deals, contacts }: Props) {
  return (
    <Tabs defaultValue="note" className="w-full">
      <TabsList>
        <TabsTrigger value="note">Note</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="file">File</TabsTrigger>
      </TabsList>
      <TabsContent className="border rounded" value="note">
        <AddNote pipelineId={pipelineId} deals={deals} contacts={contacts} />
      </TabsContent>
      <TabsContent className="border rounded" value="activity">
        <AddActivity
          pipelineId={pipelineId}
          deals={deals}
          contacts={contacts}
        />
      </TabsContent>
      <TabsContent className="border rounded" value="file">
        <AddFile pipelineId={pipelineId} deals={deals} contacts={contacts} />
      </TabsContent>
    </Tabs>
  );
}
