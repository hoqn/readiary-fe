import IcBack from "@material-symbols/svg-400/rounded/arrow_back_ios-fill.svg";
import cs from "classnames";
import { MouseEventHandler } from "react";
import BackButton from "./back-button";
import styles from "./header.module.scss";

interface Props extends BaseProps {
  title?: string;
  hasBackButton?: boolean;
  onClickBackButton?: MouseEventHandler<HTMLButtonElement>;
}

export default function Header({ className, title, hasBackButton = false, onClickBackButton, ...restProps }: Props) {
  return (
    <div className={cs(styles.header, className)} {...restProps}>
      <div className={styles.header__inner}>
        {hasBackButton && (
          <BackButton className={styles["back-button"]}>
            <IcBack width="24" height="24" />
          </BackButton>
        )}
        {title ? (
          <span className={styles.header__title}>{title}</span>
        ) : (
          <span className={styles.header__brand}>Readiary</span>
        )}
      </div>
    </div>
  );
}
