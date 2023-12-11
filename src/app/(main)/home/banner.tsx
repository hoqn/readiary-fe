import cs from "classnames";
import styles from "./banner.module.scss";

interface Props extends BaseProps {}

export default function HomeBanner({ className }: Props) {
  return (
    <div className={cs(styles["banner"], className)}>
      <div className={styles["banner__headline"]}>Readiary로 더 나은, 더 깊은 독서 활동을 즐기세요.</div>
    </div>
  );
}
