import { PropsWithChildren } from "react";
import styles from "./modal.module.scss";

interface Props extends BaseProps, PropsWithChildren {}

export default function ModalSheet({ className, children, ...restProps }: Props) {
  return <div className={styles["sheet"]}>{children}</div>;
}
