"use client";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { sidebarLinks } from "../../constants/index";
import "../../app/globals.css";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { SignOut } from "@phosphor-icons/react";
const LeftSidebar = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-white bg-black pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex=1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                isActive && "bg-purple-500"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <span className=" text-white max-lg:hidden">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <button
            className="sbutton"
            onClick={async () => {
              await signOut();
              router.push("/sign-in");
            }}
          >
            <div className="sbutton-overlay"></div>
            <span>
              <SignOut size={24} />
              Logout
            </span>
          </button>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
