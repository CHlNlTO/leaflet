"use client";

import Profiles from "@/components/component/Profiles";
import { Tweet } from "@/components/component/tweet";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="py-16 px-6 md:px-8 lg:px-12 min-h-screen mb-36 flex flex-col justify-start items-center gap-32">
      <motion.div
        className="h-36 w-full flex flex-col justify-start items-center space-y-16 sm:space-y-28 gap-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-green-950 font-yeseva_one flex flex-col items-center justify-center text-center">
            Our Team
          </h2>
          <p className="text-green-950 text-md font-cormorant_garamond font-semibold flex flex-col items-center justify-center text-center">
            Meet the team behind the development of this web app.
          </p>
          <Profiles />
        </div>
      </motion.div>
      <Tweet />
    </main>
  );
}
