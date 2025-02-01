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

export function truncate(arrayStr, maxLength = 20) {
  if (arrayStr.length === 0) return "";
  if (arrayStr.length === 1) return arrayStr[1];
  let result = arrayStr[0];
  let end = true;
  arrayStr.slice(1).forEach((item) => {
    if (result.length + 2 + item.length <= maxLength) result += ", " + item;
    else {
      if (end) {
        result += ", ...";
        end = false;
      }
      return "";
    }
  });
  return result;
}
