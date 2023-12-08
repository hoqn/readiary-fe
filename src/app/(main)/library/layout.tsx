import ProfileCard from "@/components/pages/library/profile-card";
import styles from "./layout.module.scss";
import { getServerSession } from "@/helpers/auth.server";

export default async function Layout({ content }: { content: React.ReactNode }) {
  const currentSession = await getServerSession();

  if (!currentSession) return null;

  return (
    <main>
      <div className={styles["body-top"]}>
        <ProfileCard
          user={{
            email: currentSession.user.email,
          }}
        />
        {/* <LibMenu /> */}
      </div>
      {content}
    </main>
  );
}
