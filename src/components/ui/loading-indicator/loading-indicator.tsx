import cs from "classnames";
import styles from "./loading-indicator.module.scss";

function LoadingIndicator({ className, ...restProps }: BaseProps) {
  // return <div className={$.loadingIndicator} />;
  return (
    <div className={cs(styles.ellipsis, className)} {...restProps}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingIndicator;
