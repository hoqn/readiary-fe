import cs from "classnames";
import styles from "./scrap-card.module.scss";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props extends BaseProps {
  data: {
    scrapId: number;
    content: string;
    memo?: string | null;
    page: number;
    imageUrl?: string | null;
  };
  href: string;
}

const MotionImage = motion(Image);

export default function ScrapCard({ className, data, href, ...restProps }: Props) {
  return (
    <Link className={cs(styles["root"], styles["root__inner"], className)} href={href} {...restProps}>
      <div className={styles["root__left"]}>
        <div className={styles["content"]}>
          <motion.p layoutId={`scrapcard-content-${data.scrapId}`}>{data.content}</motion.p>
          {!!data.page && (
            <div>
              <p className={styles["content__page"]}>p{data.page}</p>
            </div>
          )}
        </div>
        {!!data.memo?.length && (
          <div className={styles["memo"]}>
            <motion.p layoutId={`scrapcard-memo-${data.scrapId}`}>{data.memo}</motion.p>
          </div>
        )}
      </div>
      {!!data.imageUrl?.length && (
        <div className={styles["root__right"]}>
          <MotionImage
            unoptimized
            className={styles["image"]}
            src={data.imageUrl}
            alt="생성된 이미지"
            width={96}
            height={96}
            layoutId={`scrap-thumb-${data.scrapId}`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}
    </Link>
  );
}
