"use client";
import GoBack from "@/components/global/GoBack";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Calendar from "./_components/calendar";
import { Switch } from "@/components/ui/switch";
import AddActivityPrompt from "@/components/global/prompts/activity-handler/add-activity-prompt";

type Props = {};

export default function Activities({}: Props) {
  const [weekendsEnable, setWeekendsEnable] = useState(false);
  const [isAddActivityPromptOpen, setAddActivityPromptOpen] = useState(false);
  return (
    <>
      <section className="px-5 py-3 border-b">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoBack />
            <h1 className="text-lg font-semibold">Activities</h1>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <Switch onCheckedChange={(e) => setWeekendsEnable(e)} />
              <span>weekends</span>
            </div>
            <Button onClick={() => setAddActivityPromptOpen(true)}>
              <Icon icon="bi:plus" className="text-2xl mr-1" />
              <span>Activity</span>
            </Button>
          </div>
        </header>
      </section>
      <section className="p-5">
        <Calendar weekends={weekendsEnable} />
      </section>

      <AddActivityPrompt
        open={isAddActivityPromptOpen}
        setOpen={setAddActivityPromptOpen}
      />
    </>
  );
}
