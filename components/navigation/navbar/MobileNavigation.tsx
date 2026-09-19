import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Menu"
            className="invert dark:invert-0 sm:hidden"
          />
        }
      />
      <SheetContent
        side="left"
        className="bg-light-900 dark:bg-dark-200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Logo"
          />

          <p className="text-heading font-space-grotesk text-dark-100 dark:text-light-900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose
            render={<section className="flex h-full flex-col gap-6 pt-16" />}
          >
            <NavLinks isMobileNav />
          </SheetClose>

          <div className="flex flex-col gap-3">
            {userId ? (
              <SheetClose
                render={
                  <form
                    action={async () => {
                      "use server";

                      await signOut();
                    }}
                  />
                }
              >
                <Button
                  type="submit"
                  className="text-sm font-medium w-fit !bg-transparent px-4 py-3"
                >
                  <LogOut className="size-5 text-black dark:text-white" />
                  <span className="text-dark-300 dark:text-light-900">
                    Logout
                  </span>
                </Button>
              </SheetClose>
            ) : (
              <>
                <SheetClose render={<Link href={ROUTES.SIGN_IN} />}>
                  <Button className="text-xs font-medium bg-primary-100 dark:bg-dark-400 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="bg-linear-to-r from-primary-500 to-primary-500/70 bg-clip-text text-transparent">
                      Log In
                    </span>
                  </Button>
                </SheetClose>

                <SheetClose render={<Link href={ROUTES.SIGN_UP} />}>
                  <Button className="text-xs font-medium border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 text-dark-400 dark:text-light-900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
