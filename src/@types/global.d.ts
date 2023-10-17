import type { HTMLAttributes } from "react";

declare global {
  export type BaseProps = Pick<HTMLAttributes<HTMLElement>, "className">;
}
