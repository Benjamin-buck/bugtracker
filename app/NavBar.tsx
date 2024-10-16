import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex gap-6 border-b mb-5 px-5 py-4">
      <Link href="/" className="flex items-center text-2xl text-red-500">
        <FaBug />
      </Link>
      <ul className="flex gap-6">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
