import type { HTMLAttributes } from "react";

declare global {
  export interface BaseProps {
    className?: HTMLAttributes<HTMLElement>["className"];
  }
}

export {};
