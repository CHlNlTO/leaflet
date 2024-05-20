import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center text-xs text-green-950 w-full py-6 flex items-center justify-center border-t border-b-0 border-x-0 border-green-200">
      <p>
        © 2024{" "}
        <Link href="/" className="cursor-pointer hover:hover:text-[#4da954]">
          {" "}
          Leaflet
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}
