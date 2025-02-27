"use client";

import { usePathname } from "next/navigation";

export function getLastPath() {
  const path = usePathname();
  const curPath = path.split("/");
  const lastPath = curPath.length !== 0 ? curPath[curPath.length - 1] : "";
  return lastPath;
}

