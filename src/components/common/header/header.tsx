import cs from "classnames";
import styles from "./header.module.scss";

interface Props extends BaseProps {}

export default function Header({ className, ...restProps }: Props) {
  return (
    <div className={cs(styles.header, className)}>
      <div className={styles.header__inner}>
        <span className={styles.header__brand}>Readiary</span>
      </div>
    </div>
  );
}
