import { HTMLAttributes } from "react";

declare global {
  export type BaseProps = Pick<HTMLAttributes<HTMLElement>, "className">;

  export type PropsOf<C> = Parameters<C>[0];
}