import { ReactNode } from "react";

import IcHome from "@material-symbols/svg-400/rounded/home.svg";
import IcSearch from "@material-symbols/svg-400/rounded/search.svg";
import IcBook from "@material-symbols/svg-400/rounded/book.svg";

export interface MainNavigationItemData {
  slug: string;
  label: string;
  href: string;
  icon?: ({ className }: BaseProps) => ReactNode;
}

export const mainNavigationItemData: MainNavigationItemData[] = [
  {
    slug: "home",
    href: "/home",
    label: "홈",
    icon: IcHome,
  },
  {
    slug: "search",
    href: "/search",
    label: "검색",
    icon: IcSearch,
  },
  {
    slug: "library",
    href: "/library",
    label: "내 책장",
    icon: IcBook,
  },
];