import styles from "./common.module.scss";
import LoadingIndicator from "@/components/ui/loading-indicator";

export default function Loading() {
  return <div className={styles['loading-page']}>
    <LoadingIndicator />
  </div>;
}
