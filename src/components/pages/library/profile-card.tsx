import cs from "classnames";
import styles from "./profile-card.module.scss";

interface Props extends BaseProps {
  user: {
    email: string;
  };
}

export default function ProfileCard({ className, user, ...restProps }: Props) {
  return (
    <div className={cs(styles["root"], className)} {...restProps}>
      <div className={styles["inner"]}>
        <div className={styles["pan-left"]}>
          <div style={{ backgroundColor: "darkgray", width: "6rem", height: "6rem", borderRadius: 9999 }}></div>
        </div>
        <div className={styles["pan-right"]}>
          <div className={styles["content-name"]}>{user.email}</div>
        </div>
      </div>
    </div>
  );
}
