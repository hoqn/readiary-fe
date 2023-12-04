import styles from "./basic.module.scss";
import { PropsWithChildren } from "react";
import Header from "../common/header";

interface Props extends PropsWithChildren {
  title?: string;
  hasBackButton?: boolean;
  bodyClassName?: string;
}

export default function BasicLayout({ title, hasBackButton = true, children }: Props) {
  return (
    <>
      <Header className={styles["header"]} hasBackButton={hasBackButton} title={title} />
      <div className={styles["body"]}>{children}</div>
    </>
  );
}

export const createBasicLayout = (props: Omit<Props, "children">) => {
  const Component = ({ children }: PropsWithChildren) => <BasicLayout {...props}>{children}</BasicLayout>;

  return Component;
};
