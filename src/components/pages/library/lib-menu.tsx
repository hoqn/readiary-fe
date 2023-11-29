import Link from "next/link";
import cs from "classnames";
import { LibMenuData as data } from "./data";
import styles from "./lib-menu.module.scss";

interface Props extends BaseProps {}

export default function LibMenu({ className, ...restProps }: Props) {
  return (
    <div className={cs(styles["root"], className)}>
      <ul className={styles["list"]}>
        {data.map(({ label, icon: Icon, href }) => (
          <Link className={styles["item"]} key={href} href={href}>
            {Icon && (
              <div className={styles["item__icon"]}>
                {/** @ts-ignore */}
                <Icon width={styles.ICON_SIZE} height={styles.ICON_SIZE} />
              </div>
            )}
            <div className={styles["item__label"]}>{label}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
