import cs from "classnames";
import styles from "./fetching-page.module.scss";
import LoadingIndicator from "@/components/ui/loading-indicator";

interface Props extends BaseProps {
  title?: string;
  description?: string;
}

export default function FetchingPage({ className, description, title = "불러오는 중이에요", ...restProps }: Props) {
  return (
    <div className={cs(styles["root"], className)} {...restProps}>
      <div className={styles["root__inner"]}>
        <div className={styles["indicator-wrapper"]}>
          <LoadingIndicator className={styles["indicator"]} />
        </div>
        <div className={styles["content"]}>
          {title?.length && <h4 className={styles["content__title"]}></h4>}
          {description?.length && (
            <div className={styles["content__description"]}>
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
