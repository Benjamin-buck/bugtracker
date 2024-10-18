"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex gap-6 border-b mb-5 px-5 py-4 items-center">
      <Link href="/" className="flex items-center text-2xl gap-2">
        <FaBug className="text-red-500" />
        <h1 className="text-xl font-bold">Bugs.io</h1>
      </Link>
      <ul className="flex gap-6">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className={classNames({
                "text-red-600 font-bold": href === currentPath,
                "hover:text-red-500 transition-colors": true,
              })}
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
