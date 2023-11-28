import { PropsWithChildren } from "react";
import styles from "./error-page.module.scss";

interface Props extends BaseProps, PropsWithChildren {
  title?: string;
  description?: string;
}

export default function ErrorPage({
  className,
  description,
  title = "이런! 오류가 발생했어요. :(",
  children,
  ...restProps
}: Props) {
  return (
    <div className={styles["root"]} {...restProps}>
      <div className={styles["root__inner"]}>
        <h2 className={styles["title"]}>{title}</h2>
        {description?.length && (
          <div className={styles["description"]}>
            <p>{description}</p>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
