"use client";

import Image from "next/image";
import { leaves } from "@/lib/const";
import { motion } from "framer-motion";

export default function Leaves() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <motion.h1
        className="text-4xl font-bold mb-8 font-yeseva_one text-green-900"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        Leaves Directory
      </motion.h1>
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        {leaves.map((leaf, index) => (
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <Image
                alt={leaf.name}
                className="object-cover w-full h-full"
                height="300"
                src={leaf.image}
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width="400"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold font-cormorant_garamond text-green-900 mb-2">
                {leaf.filipino}
              </h2>
              <div className="flex flex-row gap-2 items-center">
                <p className="text-gray-500">{leaf.scientific}</p>
                <p className="text-gray-500 italic text-xs">scientific name</p>
              </div>
              <div className="flex flex-row gap-2 items-center mb-4">
                <p className="text-gray-500">{leaf.english}</p>
                <p className="text-gray-500 italic text-xs">english name</p>
              </div>
              <ul className="space-y-2">
                {leaf.facts.map((fact, index) => (
                  <li key={index} className="text-green-950">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </main>
  );
}
