import Link from "next/link";
import { PropsWithChildren } from "react";
import cs from "classnames";
import styles from "./book-search-result.module.scss";

interface Props extends BaseProps, PropsWithChildren {}

function BookSearchResult({ className, children, ...restProps }: Props) {
  return (
    <ul className={cs(styles["book-search-result-list"], className)} {...restProps}>
      {children}
    </ul>
  );
}

interface ItemProps extends BaseProps {
  data: {
    bookname: string;
    isbn13: string;
    bookImageURL: string;
    authors: string;
  };
}

function BookSearchResultItem({ data, className, ...restProps }: ItemProps) {
  return (
    <li className={cs(styles["book-search-result-item"], className)}>
      <Link className={styles["book-search-result-item__inner"]} href={`/book/${data.isbn13}`} {...restProps}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={cs(styles["book-search-result-item__left"], styles["book-search-result-item__image"])}
          src={data.bookImageURL}
          alt="책 표지 이미지"
        />
        <div className={styles["book-search-result-item__right"]}>
          <div className={styles["book-search-result-item__title"]}>{data.bookname}</div>
          <div className={styles["book-search-result-item__others"]}>
            <span className={styles["book-search-result-item__authors"]}>{data.authors}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export { BookSearchResult as Root, BookSearchResultItem as Item };
