import BasicLayout from "@/components/layouts/basic";
import HomeBanner from "./banner";
import styles from "./page.module.scss";
import DiaryList from "./diary-list";

export default function Page() {
  return (
    <BasicLayout hasBackButton={false} bodyClassName={styles["root"]}>
      <div className={styles["body"]}>
        <HomeBanner className={styles["banner"]} />
        <DiaryList />
      </div>
    </BasicLayout>
  );
}
