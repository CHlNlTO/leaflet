"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { people } from "@/lib/const";

export default function Profiles() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
