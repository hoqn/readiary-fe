"use client";

import cs from "classnames";
import styles from "./main-nav.module.scss";
import Link from "next/link";
import { MainNavigationItemData, mainNavigationItemData } from "./data";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

function MainNavigationItem({ data: { href, label, slug, icon: Icon } }: { data: MainNavigationItemData }) {
  const pathname = usePathname();

  const selected = useMemo(() => pathname.startsWith(href), [pathname, href]);

  return (
    <Link href={href} scroll={false} replace className={styles["main-nav__item"]} data-selected={selected ? "" : undefined}>
      {Icon && <Icon className={styles["main-nav__item-icon"]} />}
      <span>{label}</span>
    </Link>
  );
}

interface Props extends BaseProps {}

export default function MainNavigation({ className, ...restProps }: Props) {
  return (
    <>
      <div className={cs(styles["main-nav"], className)} {...restProps}>
        <div className={styles["main-nav__items"]}>
          {mainNavigationItemData.map((data) => (
            <MainNavigationItem key={data.slug} data={data} />
          ))}
        </div>
      </div>
    </>
  );
}
