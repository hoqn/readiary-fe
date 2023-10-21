"use client";

import React, { ReactElement, ReactNode } from "react";
import cs from "classnames";
import IcHome from "@material-symbols/svg-400/rounded/home-fill.svg?svgr";
import IcSearch from "@material-symbols/svg-400/rounded/search-fill.svg?svgr";
import IcBook from "@material-symbols/svg-400/rounded/book-fill.svg?svgr";
import $ from "./MainNav.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

const MenuItems: {
  id: number;
  active: (pathname: string) => boolean;
  label: string;
  href: string;
  icon?: ({ className }: BaseProps) => ReactNode;
}[] = [
  {
    id: 0,
    label: "피드",
    icon: (props) => <IcHome {...props} />,
    href: "/feed",
    active: (pathname) => pathname.startsWith("/feed"),
  },
  {
    id: 1,
    label: "도서 검색",
    icon: (props) => <IcSearch {...props} />,
    href: "/search",
    active: (pathname) => pathname.startsWith("/search"),
  },
  {
    id: 2,
    label: "내 서재",
    icon: (props) => <IcBook {...props} />,
    href: "/library",
    active: (pathname) => pathname.startsWith("/library"),
  },
];

const MotionLink = motion(Link);

function NavItem({ item }: { item: (typeof MenuItems)[number] }) {
  const pathname = usePathname();

  return (
    <MotionLink
      key={item.id}
      whileTap={{ scaleX: 0.84, scaleY: 0.8, backgroundBlendMode: "darken" }}
      className={cs($.bnav__navItem, item.active(pathname) && $.bnav__navItem$selected)}
      href={item.href}
    >
      {item.icon && (
        <div className={$.bnav__navIcon}>
          <item.icon />
        </div>
      )}
      {item.label}
    </MotionLink>
  );
}

interface Props extends BaseProps {}

function MainNav({ className, ...restProps }: Props) {
  return (
    <div className={cs(className, $.bnav)} {...restProps}>
      <div className={$.bnav__navItems} style={{ color: "InfoText" }}>
        {MenuItems.map((it) => (
          <NavItem key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
}

export default MainNav;
