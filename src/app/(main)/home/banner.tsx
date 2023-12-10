import styles from "./banner.module.scss";

export default function HomeBanner() {
  return (
    <div className={styles["banner"]}>
      <div className={styles["banner__headline"]}>Readiary로 더 나은, 더 깊은 독서 활동을 즐기세요.</div>
    </div>
  );
}
