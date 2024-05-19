import Link from "next/link";
import { LeafIcon } from "./Logo";

export default function Header() {
  return (
    <header className="bg-[#e2fce6] py-4 px-6 md:px-8 lg:px-12 flex items-center justify-between">
      <Link
        className="flex items-center gap-2 text-green-950 font-bold text-xl font-yeseva_one hover:text-[#4da954] transition-colors"
        href="#"
      >
        <LeafIcon className="w-6 h-6" />
        Leaflet
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm text-green-950 font-medium font-yeseva_one">
        <Link className="hover:text-[#4da954] transition-colors" href="/">
          Home
        </Link>
        <Link className="hover:text-[#4da954] transition-colors" href="/about">
          About
        </Link>
        <Link className="hover:text-[#4da954] transition-colors" href="#">
          Features
        </Link>
        <Link className="hover:text-[#4da954] transition-colors" href="#">
          Feedback
        </Link>
      </nav>
    </header>
  );
}
