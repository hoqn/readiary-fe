import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
