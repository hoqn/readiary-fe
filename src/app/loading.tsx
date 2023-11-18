import LoadingIndicator from "@/components/ui/loading-indicator";
import styles from "./common.module.scss";

export default function Loading() {
  return (
    <div className={styles['loading-page']}>
      <div className={styles['loading-page__content']}>
        <LoadingIndicator />
      </div>
    </div>
  )
}