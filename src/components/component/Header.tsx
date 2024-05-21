"use client";

import Link from "next/link";
import { LeafIcon } from "./Logo";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const headerVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const linkVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Header() {
  return (
    <motion.header
      className="py-4 px-6 md:px-8 lg:px-12 flex items-center justify-between"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <Link
        className="flex items-center gap-2 text-green-900 font-bold text-xl font-yeseva_one hover:text-[#4da954] transition-colors active:text-green-700"
        href="/"
      >
        <LeafIcon className="w-6 h-6 hover:fill-current" />
        Leaflet
      </Link>
      <motion.nav
        className="hidden md:flex items-center gap-6 text-sm text-green-900 font-inter font-bold"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ staggerChildren: 0.3 }}
      >
        <motion.div
          variants={linkVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link className="hover:text-[#4da954] transition-colors" href="/">
            Home
          </Link>
        </motion.div>
        <motion.div
          variants={linkVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            className="hover:text-[#4da954] transition-colors"
            href="/about"
          >
            About
          </Link>
        </motion.div>
        <motion.div
          variants={linkVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            className="hover:text-[#4da954] transition-colors"
            href="/leaves"
          >
            Leaf
          </Link>
        </motion.div>
      </motion.nav>
      <Menu className="flex md:hidden text-green-900" size="24" />
    </motion.header>
  );
}
