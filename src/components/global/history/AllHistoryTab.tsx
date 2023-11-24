import React, { useEffect, useState } from "react";
import ActivityCard from "./cards/ActivityCard";
import NoteCard from "./cards/NoteCard";
import FileCard from "./cards/FileCard";

type Props = {
  activities: any;
  notes: any;
  files: any;
};

const AllHistory = ({ activities, notes, files }: Props) => {
  const [allHistory, setAllHistory] = useState<any>([]);
  useEffect(() => {
    let isMounted = true;
    const createHistory = () => {
      setAllHistory([]);
      if (activities && activities?.data?.length)
        activities.data.forEach((act: any) =>
          setAllHistory((prev: any) => [...prev, { ...act, type: "activity" }])
        );
      if (notes && notes?.data?.length)
        notes.data.forEach((note: any) =>
          setAllHistory((prev: any) => [...prev, { ...note, type: "note" }])
        );
      if (files && files.length)
        files.data.forEach((file: any) =>
          setAllHistory((prev: any) => [...prev, { ...file, type: "file" }])
        );
    };
    isMounted && createHistory();
    return () => {
      isMounted = false;
    };
  }, [activities, notes, files]);
  return (
    <ul className="flex flex-col gap-2">
      {allHistory.length !== 0 ? (
        allHistory.map((history: any, index: number) => {
          return (
            <li key={index}>
              {history.type === "note" && <NoteCard note={history} />}
              {history.type === "activity" && (
                <ActivityCard activity={history} />
              )}
              {history.type === "file" && <FileCard file={history} />}
              {/* {history.type === "email" && <EmailCard email={history} />} */}
            </li>
          );
        })
      ) : (
        <section className="p-10 text-center bg-bg mt-3">
          <p>No history to show</p>
        </section>
      )}
    </ul>
  );
};

export default AllHistory;
