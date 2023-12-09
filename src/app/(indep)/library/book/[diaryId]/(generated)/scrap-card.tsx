import cs from "classnames";
import styles from "./scrap-card.module.scss";
import Link from "next/link";
import Image from "next/image";

interface Props extends BaseProps {
  data: {
    content: string;
    memo?: string | null;
    imageUrl?: string | null;
  };
  href: string;
}

export default function ScrapCard({ className, data, href, ...restProps }: Props) {
  return (
    <Link className={cs(styles["root"], styles["root__inner"], className)} href={href} {...restProps}>
      <div className={styles["root__left"]}>
        <div className={styles["content"]}>
          <p>{data.content}</p>
          <div>
            <p className={styles["content__page"]}>p64</p>
          </div>
        </div>
        {!!data.memo?.length && (
          <div className={styles["memo"]}>
            <p>{data.memo}</p>
          </div>
        )}
      </div>
      {!!data.imageUrl?.length && (
        <div className={styles["root__right"]}>
          <Image src={data.imageUrl} alt="생성된 이미지" width={96} height={96} />
        </div>
      )}
    </Link>
  );
}
