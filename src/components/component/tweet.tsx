"use client";

import { Card } from "@/components/ui/card";
import { IconProps } from "@/lib/types";
import Image from "next/image";
import { LeafIcon } from "./Logo";
import Link from "next/link";
import { tweets } from "@/lib/tweets";
import { motion } from "framer-motion";
import { useState } from "react";

export function Tweet() {
  const [likes, setLikes] = useState(
    Array.from({ length: 5 }).map(
      (_, index) => tweets[index].likes as unknown as number
    )
  );

  const [comments, setComments] = useState(
    Array.from({ length: 5 }).map(
      (_, index) => tweets[index].comments as unknown as number
    )
  );

  const [retweets, setRetweets] = useState(
    Array.from({ length: 5 }).map(
      (_, index) => tweets[index].retweets as unknown as number
    )
  );

  const handleLikeClick = (index: number) => {
    const newLikes = [...likes];
    newLikes[index] = Number(newLikes[index]) + 1;
    setLikes(newLikes);
  };

  const handleCommentClick = (index: number) => {
    const newComments = [...comments];
    newComments[index] = Number(newComments[index]) + 1;
    setComments(newComments);
  };

  const handleRetweetClick = (index: number) => {
    const newRetweets = [...retweets];
    newRetweets[index] = Number(newRetweets[index]) + 1;
    setRetweets(newRetweets);
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key="1"
          className="max-w-[500px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl m-3"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <span className="object-cover md:w-48 rounded-md bg-gray-100 w-[192px] h-[192px] " />
            </div>
            <div className="p-8 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href={tweets[index].url} target="_blank" passHref>
                    <Image
                      alt="Profile picture"
                      className="rounded-full"
                      height="40"
                      src={tweets[index].image}
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                  </Link>
                  <div className="ml-4">
                    <div className="tracking-wide text-sm text-black font-semibold">
                      {tweets[index].name}
                    </div>
                    <div className="text-gray-400">
                      {tweets[index].username}
                    </div>
                  </div>
                </div>
                <Link href="/">
                  <LeafIcon className="h-6 w-6 text-green-500 fill-none hover:fill-current active:text-green-700" />
                </Link>
              </div>
              <p className="mt-4 text-green-900">{tweets[index].header}</p>
              <p
                className="mt-4 text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: tweets[index].tweet.replace(/\n/g, "<br />"),
                }}
              ></p>
              <div className="flex mt-6 justify-between items-center gap-4">
                <div className="flex space-x-4 text-gray-400">
                  <div
                    className="flex items-center"
                    onClick={() => handleLikeClick(index)}
                  >
                    <HeartIcon className="h-6 w-6 text-red-500 hover:fill-current active:text-red-700 cursor-pointer" />
                    <span className="ml-1 text-red-500">{likes[index]}</span>
                  </div>
                  <div
                    className="flex items-center"
                    onClick={() => handleCommentClick(index)}
                  >
                    <MessageCircleIcon className="h-6 w-6 text-green-500 hover:fill-current active:text-green-700 cursor-pointer" />
                    <span className="ml-1 text-green-500">
                      {comments[index]}
                    </span>
                  </div>
                  <div
                    className="flex items-center"
                    onClick={() => handleRetweetClick(index)}
                  >
                    <RepeatIcon className="h-6 w-6 text-blue-500 hover:fill-current active:text-blue-700 cursor-pointer" />
                    <span className="ml-1 text-blue-500">
                      {retweets[index]}
                    </span>
                  </div>
                </div>
                <div className="text-gray-400 hidden sm:flex">
                  {tweets[index].date}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </motion.div>
  );
}

function HeartIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MessageCircleIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function RepeatIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
