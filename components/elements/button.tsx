import { cn } from "@/lib/utils";
import React from "react";
import { LinkProps } from "next/link"; // Or from your routing library

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "simple" | "outline" | "primary" | "muted";
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  href?: LinkProps["href"];
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  as: Tag = "button",
  className,
  children,
  ...props
}) => {
  const variantClass =
    variant === "simple"
      ? "bg-secondary relative z-10 bg-transparent hover:border-secondary/50 hover:bg-secondary/10  border border-transparent text-white text-sm md:text-sm transition font-medium duration-200  rounded-md px-4 py-2  flex items-center justify-center"
      : variant === "outline"
      ? "bg-white relative z-10 hover:bg-secondary/90 hover:shadow-xl  text-black border border-black hover:text-black text-sm md:text-sm transition font-medium duration-200  rounded-md px-4 py-2  flex items-center justify-center"
      : variant === "primary"
      ? "bg-primary hover:bg-[#C4AD94] hover:text-white relative z-10 text-black text-base md:text-sm transition font-bold duration-200  rounded-[12px] px-11 py-4 flex items-center justify-center shadow-[0px_2px_4px_rgba(0,0,0,0.15)]"
      : variant === "muted"
      ? "bg-neutral-800 relative z-10 hover:bg-neutral-900  border border-transparent text-white text-sm md:text-sm transition font-medium duration-200  rounded-md px-4 py-2  flex items-center justify-center shadow-[0px_1px_0px_0px_#FFFFFF20_inset]"
      : "";
  return (
    <Tag
      className={cn(
        "bg-secondary w-full sm:w-auto relative z-10 bg-transparent text-white text-sm md:text-sm transition font-medium duration-200  rounded-md px-10 py-2 flex items-center justify-center ",
        variantClass,
        className
      )}
      {...props}
    >
      {children ?? `Get Started`}
    </Tag>
  );
};
