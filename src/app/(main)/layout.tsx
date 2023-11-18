"use client";

import MainNavigation from "@/components/common/main-nav";
import { PropsWithChildren } from "react";
import $ from "./common.module.scss";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <MainNavigation className={$["bottom-nav"]} />
    </>
  );
}
