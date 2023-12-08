import ProfileCard from "@/components/pages/library/profile-card";
import cs from "classnames";
import styles from "./page.module.scss";
import LibMenu from "@/components/pages/library/lib-menu";
import Link from "next/link";
import { getServerSession } from "@/helpers/auth.server";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentSession = await getServerSession();

  if (!currentSession) {
    redirect("/signin");
    return null;
  }

  return (
    <>
      <div className={styles["body-top"]}>
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
