"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(val) {
  if (val.length === 0) return val;
  if (val.length === 1) return String(val).charAt(0).toUpperCase();
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
