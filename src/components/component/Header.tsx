"use client";

import Link from "next/link";
import { LeafIcon } from "./Logo";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        Snapfolia
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
          <Link
            className="hover:text-[#4da954] transition-colors font-yeseva_one"
            href="/"
          >
            Home
          </Link>
        </motion.div>
        <motion.div
          variants={linkVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            className="hover:text-[#4da954] transition-colors font-yeseva_one"
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
            className="hover:text-[#4da954] transition-colors font-yeseva_one"
            href="/leaves"
          >
            Leaf
          </Link>
        </motion.div>
      </motion.nav>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="flex md:hidden text-green-900" size="24" />
        </SheetTrigger>
        <SheetContent className="dark:bg-white z-[500]">
          <motion.nav
            className="flex flex-col items-center gap-6 text-sm text-green-900 font-inter font-bold"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            transition={{ staggerChildren: 0.3 }}
          >
            <SheetHeader>
              <SheetTitle className="text-green-900 dark:text-green-900">
                Menu
              </SheetTitle>
            </SheetHeader>
            <motion.div
              variants={linkVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link
                className="hover:text-[#4da954] transition-colors focus-visible:ring-green-900"
                href="/"
              >
                <SheetClose className="focus-visible:ring-green-900">
                  Home
                </SheetClose>
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
                <SheetClose>About</SheetClose>
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
                <SheetClose>Leaf</SheetClose>
              </Link>
            </motion.div>
          </motion.nav>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
