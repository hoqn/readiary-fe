import NestedSlot from "@/utils/nested-slot";
import { VariantProps, cva } from "class-variance-authority";
import cs from "classnames";
import { ComponentPropsWithoutRef, PropsWithChildren, forwardRef } from "react";
import LoadingIndicator from "../loading-indicator";
import styles from "./button.module.scss";

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
    },
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
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props & ComponentPropsWithoutRef<"button">>(
  ({ className, children, asChild, intent, tint, size, loading = false, disabled, ...restProps }, ref) => {
    const Component = asChild ? NestedSlot : "button";

    return (
      <Component
        className={cs($root({ intent, tint, size }), className)}
        ref={(asChild ? undefined : ref) as any}
        disabled={disabled || loading}
        {...restProps}
      >
        <div className={styles["root__inner"]}>
          {loading && <LoadingIndicator className={styles["loading-indicator"]} />}
          <span className={styles["label"]}>{children}</span>
        </div>
      </Component>
    );
  }
);

Button.displayName = "ui@Button";

export default Button;
