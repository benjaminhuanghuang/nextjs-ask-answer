"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const NavLinks = ({
  isMobileNav = false,
  userId,
}: {
  isMobileNav?: boolean;
  userId?: string;
}) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const linkClassName = cn(
          isActive
            ? "primary-gradient rounded-lg text-light-900"
            : "text-dark300_light900",
          "flex items-center justify-start gap-4 bg-transparent p-4"
        );

        const linkChildren = (
          <>
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert dark:invert-0": !isActive })}
            />
            <p
              className={cn(
                "text-sm",
                isActive ? "font-bold" : "font-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </>
        );

        return isMobileNav ? (
          <SheetClose
            key={item.route}
            render={<Link href={item.route} className={linkClassName} />}
          >
            {linkChildren}
          </SheetClose>
        ) : (
          <Link href={item.route} key={item.route} className={linkClassName}>
            {linkChildren}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
