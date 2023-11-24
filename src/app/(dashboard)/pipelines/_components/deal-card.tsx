import { useGetDealQuery } from "@/redux/services/dealApi";
import { ContactInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  dealId: string;
};

export default function DealCard({ dealId }: Props) {
  const {
    data: deal,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetDealQuery({
    id: dealId,
    params: { populate: "items contacts label" },
  });

  const [total, setTotal] = useState<number>(0);

  if (isSuccess)
    return (
      <Link
        href={"/deals/" + deal?._id}
        className={
          "cursor-pointer w-full bg-background relative border mb-1 p-2 flex flex-col gap-2"
        }
      >
        <div className="top">
          {deal.label ? (
            <p
              className="w-[20%] h-[5px] mb-2"
              style={{ background: deal.label.color }}
            />
          ) : null}
          <h4 className="font-medium">{deal.title}</h4>
          <DealContacts contacts={deal.contacts} />
          <div className="activity absolute top-2 right-2">
            {/* <ActivityStatus dealId={deal._id} /> */}
          </div>
        </div>
        <div className="bottom flex items-center gap-3 text-sm text-muted-foreground">
          <div
            className="user"
            data-tooltip-id="date-tooltip"
            data-tooltip-content={
              "Created " + moment(deal.createdAt).format("DD-MM-YYYY")
            }
          >
            <span>{moment(deal.createdAt).fromNow()}</span>
            <Tooltip id="date-tooltip" className="tooltip" delayShow={100} />
          </div>
          <div className="amount flex items-center">
            <DealTotal
              items={deal.items}
              value={deal.value}
              // currency={deal.currency}
              total={total}
              setTotal={setTotal}
            />
          </div>
          <div
            data-tooltip-id="product-tooltip"
            data-tooltip-content={"Products " + deal.items.length}
            className="flex items-center gap-2"
          >
            <Icon icon="solar:box-minimalistic-outline" className="text-base" />
            {deal?.items?.length}
          </div>
          <Tooltip id="product-tooltip" className="tooltip" delayShow={100} />
        </div>
      </Link>
    );
}

const DealContacts = ({ contacts }: { contacts: ContactInterface[] }) => {
  if (contacts.length)
    return (
      <div className="text-gray-500 text-sm flex gap-2 mt-1">
        {contacts.map((client, i: number) => {
          return (
            i < 2 && (
              <div
                key={i}
                data-tooltip-id={`${i}-tooltip`}
                data-tooltip-html={`<div>
              <h3 class="font-semibold">${client.contactPerson}</h3>
              <p class="text-muted-foreground">${client.company}</p>
              </div>`}
              >
                <Tooltip
                  id={`${i}-tooltip`}
                  className="tooltip"
                  delayShow={100}
                />
                {client.contactPerson}
                {contacts.length - 1 !== i && ","}
              </div>
            )
          );
        })}
        {contacts.length > 2 && <span>{contacts.length - 2} more</span>}
      </div>
    );
};

const DealTotal = ({
  items,
  value,
  total,
  setTotal,
}: {
  items: any;
  value: any;
  total: number;
  setTotal: any;
}) => {
  useEffect(() => {
    if (items.length !== 0) {
      let currTotal = 0;
      items.forEach((item: any) => (currTotal = +item.total));
      setTotal(currTotal);
    } else {
      setTotal(value);
    }
  }, [items, setTotal, value]);
  return <p>{total}</p>;
};
