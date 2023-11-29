import { ReactNode } from "react";
import IcWish from "@material-symbols/svg-400/rounded/collections_bookmark.svg";
import IcBook from "@material-symbols/svg-400/rounded/book_2.svg";
import IcAnalytics from "@material-symbols/svg-400/rounded/monitoring.svg";

export const LibMenuData: {
  href: string;
  icon?: () => ReactNode;
  label: string;
}[] = [
  {
    label: "읽을 책",
    icon: IcWish,
    href: "/library/wish",
  },
  {
    label: "읽은 책과 다이어리",
    icon: IcBook,
    href: "/library/book",
  },
  {
    label: "통계",
    icon: IcAnalytics,
    href: "/library/analytics",
  },
];