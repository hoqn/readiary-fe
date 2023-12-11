import cs from "classnames";
import styles from "./banner.module.scss";
import Image from "next/image";

interface Props extends BaseProps {}

export default function HomeBanner({ className }: Props) {
  return (
    <div className={cs(styles["banner"], className)}>
      <div className={cs(styles["banner__headline"], styles["banner__layer"])} style={{ zIndex: 5 }}>
        Readiary로 더 나은, 더 깊은 독서 활동을 즐기세요.
      </div>
    </div>
  );
}
