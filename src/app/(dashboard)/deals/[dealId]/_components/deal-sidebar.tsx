import { DealInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

type Props = {
  deal: DealInterface;
};

export default function DealSidebar({ deal }: Props) {
  if (deal)
    return (
      <div className="w-1/3 h-screen shrink-0">
        <ul>
          <li className="p-10 border-b">
            <div>
              <h2 className="text-lg font-semibold">Overview</h2>
              <ul className="mt-3 flex flex-col gap-2">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Deal Age</span>
                  <span>a day ago</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>a day ago</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Closing Date</span>
                  <span>23 July 23</span>
                </li>
              </ul>
            </div>
          </li>
          <li className="p-10 border-b">
            <div>
              <h2 className="text-lg font-semibold mb-3">Contacts</h2>
              <div>
                <div>
                  {deal.contacts.map((contact, i: number) => (
                    <Link href={"/contacts/" + contact._id} key={i}>
                      <div className="flex items-center gap-3 mb-1">
                        <Icon icon="uil:user" className="text-xl" />
                        {contact.contactPerson}
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        {contact.company}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
}
