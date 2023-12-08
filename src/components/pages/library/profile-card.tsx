import cs from "classnames";
import styles from "./profile-card.module.scss";
import crypto from "crypto";
import Image from "next/image";
import Button from "@/components/ui/button";
import Link from "next/link";

interface Props extends BaseProps {
  user: {
    email: string;
  };
}

export default function ProfileCard({ className, user, ...restProps }: Props) {
  // Gravatar Image
  const gravatarHash = crypto.createHash("sha256").update(String(user.email).trim().toLowerCase()).digest("hex");
  const gravatarUrl = `https://gravatar.com/avatar/${gravatarHash}?d=mp`;

  return (
    <div className={cs(styles["root"], className)} {...restProps}>
      <div className={styles["inner"]}>
        <div className={styles["pan-left"]}>
          <Image className={styles["profile-img"]} alt="프로필 이미지" src={gravatarUrl} width={32} height={32} />
        </div>
        <div className={styles["pan-right"]}>
          <div className={styles["content-name"]}>{user.email}</div>
          <Button className={styles["signout-button"]} intent="text" tint="neutral" asChild>
            <Link href="/signout">로그아웃</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
