import { cn } from "@/lib/utils";
import React from "react";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`xl:max-w-7xl mx-auto px-5 md:px-10 xl:px-25 `, className)}>
      {children}
    </div>
  );
};
