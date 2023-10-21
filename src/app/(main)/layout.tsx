import Header from "@/components/common/Header";
import MainNav from "@/components/common/MainNav";
import type { PropsWithChildren } from "react";
import $ from "./layout.module.scss";

interface Props extends PropsWithChildren {}

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <MainNav className={$.mainNav} />
    </>
  );
}
