import $ from "./LoadingIndicator.module.scss";

function LoadingIndicator() {
  // return <div className={$.loadingIndicator} />;
  return <div className={$.ellipsis}><div></div><div></div><div></div><div></div></div>;
}

export default LoadingIndicator;
