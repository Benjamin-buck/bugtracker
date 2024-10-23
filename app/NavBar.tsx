"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const NavBar = () => {
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
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
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
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Log in</Link>;
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex gap="3" align="center" className="font-semibold">
            {session!.user?.name}
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              className="cursor-pointer"
            />
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email!}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
