import type { Metadata } from "next";
import "@/styles/global.scss";
import Providers from "./_providers";
import styles from "./common.module.scss";

export const metadata: Metadata = {
  title: "Readiary",
  description: "Let's read!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={styles.body}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
