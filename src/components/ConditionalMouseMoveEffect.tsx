"use client";

import { usePathname } from "next/navigation";
import MouseMoveEffect from "@/components/mouse-move-effect";
import path from "path";

export default function ConditionalMouseMoveEffect() {
  const pathname = usePathname();
  if (
    pathname === "/resumes" ||
    pathname === "/billing" ||
    pathname === "/editor" ||
    pathname === "/billing/success"
  ) {
    return null;
  }
  return <MouseMoveEffect />;
}
