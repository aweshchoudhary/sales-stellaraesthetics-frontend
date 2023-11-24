"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function GoBack({}: Props) {
  const router = useRouter();
  return (
    <button className="text-2xl" onClick={() => router.back()}>
      <Icon icon="solar:arrow-left-outline" />
    </button>
  );
}
