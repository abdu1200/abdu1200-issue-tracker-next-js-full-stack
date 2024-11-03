"use client";

import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  return (
    <nav className=" mb-6 border px-6 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex gap="5" align="center">
            <Link href="/">
              <AiFillBug />
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
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const currentPath = usePathname();
  // console.log(currentPath);

  return (
    <ul className="flex space-x-5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              //to use utility classes with condition
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath, //we use '!' to override the above true statement
              //   'text-zinc-500' : link.href !== currentPath,  //replaced
              // 'hover:text-zinc-700 transition-colors' : true  //replaced
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}{" "}
      {/*mapping the array to the link component to reduce li redundancy or to make it dynamic */}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession(); //to access the authentication session from the session provider

  {
    /* Log session and status for debugging/checking */
  }
  console.log("Client Session:", session);
  console.log("Status:", status);

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Flex gap="5">
        <Link className="nav-link" href="/api/auth/signin">
          Log in
        </Link>
        <Link className="nav-link" href="/register">
          Sign up
        </Link>
      </Flex>
    );

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              radius="full"
              size="3"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="3"> {session.user!.email} </Text>{" "}
              {/*to give it a size */}
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

{
  /**
  {links.map(link => <Link className={`${ link.href === currentPath ? 'text-zinc-900': 'text-zinc-500'} hover:text-zinc-700 transition-colors`} href={link.href}>{link.label}</Link>)}   {/*mapping the array to the link component to reduce li redundancy or to make it dynamic 
*/
}

export default NavBar;

//you gotta give a skeleton a width otherwise it takes the whole free space
//after the return statement, you put jsx
//we refactor to make the code more readable and maintainable and also to achieve the single responsiblity principle
//giving type is anotating

//session is an object with a 'user' property and 'user' is an object with 'email, name, image'
//session returns a user

//next auth doesn't care how the user get inputed in to our system
