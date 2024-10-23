"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";
import { stat } from "fs";

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-4">
      <Container>
        <Flex justify="between" align="center">
          <Flex gap="3" align="center">
            <Link
              href="/"
              className="flex items-center text-2xl gap-2 flex-row"
            >
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
