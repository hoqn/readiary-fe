import type { Metadata } from "next";

import "@/styles/global.scss";
import { QueryClient } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "BookDiary",
  description: "독서를 생활화합시다",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
