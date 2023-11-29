import ProfileCard from "@/components/pages/library/profile-card";
import cs from "classnames";
import styles from "./page.module.scss";
import LibMenu from "@/components/pages/library/lib-menu";
import Link from "next/link";
import { getServerSession } from "@/helpers/auth.server";
import { redirect } from "next/navigation";

export default function Page() {
  const currentSession = getServerSession();

  if (!currentSession) {
    redirect("/signin");
    return null;
  }

  return (
    <>
      <div className={styles["body-top"]}>
        <div className={styles["sign-menu"]}>
          {/* {hasSignedIn && <div>Login 되어 있음</div>} */}
          {/* <Link className={styles["signin-link"]} href="/signin">
              로그인
            </Link> */}
          <Link className={styles["signout-link"]} href="/signout">
            로그아웃
          </Link>
        </div>
        <ProfileCard
          user={{
            email: currentSession.user.email,
          }}
        />
        <LibMenu className={styles["menu-bar"]} />
      </div>
    </>
  );
}
