import { Badge } from "@/components/ui/badge";
import { useUpdateActivityMutation } from "@/redux/services/activityApi";
import { ActivityInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EdiActivityPrompt from "@/components/global/prompts/activity-handler/edit-activity-prompt";

type Props = {
  activity: ActivityInterface;
};

export default function ActivityCard({ activity }: Props) {
  const [updateActivity, { isSuccess, isError, error }] =
    useUpdateActivityMutation();

  const handleMarkDoneActivity = async () => {
    await updateActivity({
      id: activity._id,
      update: {
        completed_on: activity.completed_on ? null : new Date(),
      },
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      toast.success(
        activity.completed_on
          ? "Activity marked as uncompleted"
          : "Activity marked as completed"
      );
    }
    if (isError) {
      toast.error("Got error while marking Activity");
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, error, isError, activity.completed_on]);

  const [isEditActivityPromptOpen, setEditActivityPromptOpen] = useState(false);

  return (
    <div className="flex gap-3">
      <div className="w-[50px] h-[50px] flex items-center justify-center bg-accent rounded border">
        <Icon icon={activity.icon} className="text-xl" />
      </div>
      <div className="flex-1 bg-accent h-full p-3 border rounded">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={handleMarkDoneActivity}>
            <Icon
              icon={
                activity.completed_on ? "bi:check-circle-fill" : "bi:circle"
              }
              className="text-xl"
            />
          </button>
          <h2>{activity.title}</h2>
        </div>
        <p className="text-sm">{activity.description}</p>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <Badge variant={activity.completed_on ? "success" : "pending"}>
            {activity.completed_on ? "completed" : "pending"}
          </Badge>
          {activity.completed_on ? (
            <p>{moment(activity.completed_on).fromNow()}</p>
          ) : (
            <p className="flex gap-2 items-center">
              <Icon icon="solar:clock-circle-outline" className="text-xl" />
              <span>
                {moment(activity.startDateTime).format("L")} -{" "}
                {moment(activity.endDateTime).format("L")}
              </span>
            </p>
          )}

          <p className="flex items-center gap-2">
            <Icon icon="solar:user-outline" className="text-lg" /> Awesh
            Choudhary
          </p>
          <button onClick={() => setEditActivityPromptOpen(true)}>
            update
          </button>
        </div>
      </div>
      <EdiActivityPrompt
        open={isEditActivityPromptOpen}
        setOpen={setEditActivityPromptOpen}
        activityId={activity._id}
      />
    </div>
  );
}
