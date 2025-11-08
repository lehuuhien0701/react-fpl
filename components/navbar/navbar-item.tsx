"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: never;
  children: ReactNode;
  active?: boolean;
  className?: string;
  target?: string;
};

export function NavbarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center font-semibold text-base leading-[110%] px-3 py-2 rounded-md transition duration-200 hover:text-primary",
        (active || pathname?.includes(href)) && "active",
        className
      )}
      target={target}
    >
      {children}
    </Link>

  );
}
