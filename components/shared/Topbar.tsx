import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../../app/globals.css"

const Topbar = () => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-3 text-white bg-gradient-to-r from-black via-neutral-900 to-black">
      <Link className="flex items-center gap-4" href={"/"}>
        <Image src="/logo.png" alt="logo" height={28} width={28} />
        <span className="text-xl font-bold max-xs:hidden">Knit</span>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <button className="sbutton">
                <div className="sbutton-overlay"></div>
                <span>
                  Logout
                </span>
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher appearance={{elements : {organizationSwitcherTrigger: "py-2 px-4"}}}/>
      </div>
    </nav>
  );
};

export default Topbar;
