import { polymorphicForwardRef } from "@/utils/polymorphic-forward-ref";
import { PropsWithChildren } from "react";
import cs from "classnames";
import { VariantProps, cva } from "class-variance-authority";
import styles from "./button.module.scss";
import LoadingIndicator from "../loading-indicator";

const $root = cva(styles.root, {
  variants: {
    tint: {
      primary: styles["root--primary"],
      neutral: styles["root--neutral"],
    },
    intent: {
      tonal: styles["root--tonal"],
      contained: styles["root--contained"],
      text: styles["root--text"],
    },
    size: {
      sm: styles["root--sm"],
      md: styles["root--md"],
      lg: styles["root--lg"],
    }
  },
  defaultVariants: {
    tint: "neutral",
    intent: "tonal",
    size: "md",
  },
});

interface Props extends BaseProps, PropsWithChildren, VariantProps<typeof $root> {
  loading?: boolean;
  disabled?: boolean;
}

const Button = polymorphicForwardRef<"button", Props>(
  ({ className, children, as, intent, tint, size, loading = false, disabled, ...restProps }, ref) => {
    const Component = as || "button";

    return (
      <Component className={cs($root({ intent, tint, size }), className)} ref={ref} disabled={disabled || loading} {...restProps}>
        {loading && (<LoadingIndicator className={styles["loading-indicator"]} />)}
        <span className={styles["label"]}>{children}</span>
      </Component>
    );
  }
);

Button.displayName = "ui@Button";

export default Button;
