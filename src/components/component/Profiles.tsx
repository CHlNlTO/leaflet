"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { people } from "@/lib/const";
import { StaticImageData } from "next/image";

const convertImageToString = (image: string | StaticImageData): string => {
  return typeof image === "string" ? image : image.src;
};

const normalizedPeople = people.map((person) => ({
  ...person,
  image: convertImageToString(person.image),
}));

export default function Profiles() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={normalizedPeople} />
    </div>
  );
}
