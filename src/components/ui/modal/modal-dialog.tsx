import styles from "./modal.module.scss";
import { PropsWithChildren } from "react";

interface Props extends BaseProps, PropsWithChildren {}

export default function ModalDialog({ className, children, ...restProps }: Props) {
  return (
    <div className={styles["dialog-wrapper"]}>
      <div className={styles["dialog"]} role="dialog">
        {children}
      </div>
    </div>
  );
}
