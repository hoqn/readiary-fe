import { polymorphicForwardRef } from "@/utils/polymorphic-forward-ref";
import styles from "./wide-button.module.scss";
import Button from "../button";
import cs from "classnames";
import { PropsWithChildren } from "react";

interface Props extends BaseProps, PropsWithChildren {
  tint?: Parameters<typeof Button>[0]["tint"];
  loading?: Parameters<typeof Button>[0]["loading"];
}

const WideButton = polymorphicForwardRef<"button", Props>(({ className, tint = "primary", ...restProps }, ref) => {
  return (
    // @ts-ignore
    <Button className={cs(styles.root, className)} ref={ref} intent="contained" size="lg" tint={tint} {...restProps} />
  );
});

WideButton.displayName = "ui@wide-button";

export default WideButton;
