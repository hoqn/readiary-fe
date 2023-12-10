import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import Link from "next/link";
import { ElementType } from "react";
import SignInForm from "./_signin-form";
import styles from "./page.module.scss";

export default function Page({ searchParams: { redirect = "/" } }: { searchParams: { redirect: string } }) {
  return (
    <>
      <Header className={styles.header} hasBackButton />
      <main className={styles.body}>
        <div className={styles["body-heading"]}>
          <h4 className={styles["body-heading__title"]}>로그인</h4>
          <div className={styles["body-heading__description"]}>
            Readiary 서비스를 이용하기 위해선 사용자 로그인이 필요해요.
          </div>
        </div>
        <SignInForm className={styles["signin-form"]} redirect={redirect} />
        <div className={styles["suggestion-card"]}>
          <div className={styles["suggestion"]}>
            <p>아직 회원이 아니신가요?</p>
            <Button intent="text" asChild>
              <Link className="r-chevron" href="/signup">회원 가입</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
