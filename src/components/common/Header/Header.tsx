import cs from "classnames";
import styles from "./Header.module.scss";

interface Props extends BaseProps {}

function Header({ className, ...restProps }: Props) {
  return (
    <div className={cs(className, styles['main-header'])}>
      <div className={styles["main-header__inner"]}>
        <span className={styles["main-header__brand"]}>BookDiary</span>
      </div>
    </div>
  )
}
