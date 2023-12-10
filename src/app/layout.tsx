import type { Metadata } from "next";
import "@/styles/global.scss";
import Providers from "./_providers";
import styles from "./common.module.scss";
import Script from "next/script";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Readiary",
  description: "Let's read!",
  manifest: "/manifest.json",
};

const pretendardVariable = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="context-menu">
        {`
          window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          });
        `}
      </Script>
      <html lang="ko" className={pretendardVariable.className}>
        <body className={styles.body}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
