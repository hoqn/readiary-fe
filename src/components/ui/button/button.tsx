import { polymorphicForwardRef } from "@/utils/polymorphic-forward-ref";
import { ComponentPropsWithoutRef, PropsWithChildren, PropsWithoutRef, forwardRef } from "react";
import cs from "classnames";
import { VariantProps, cva } from "class-variance-authority";
import styles from "./button.module.scss";
import LoadingIndicator from "../loading-indicator";
import { Slot } from "@radix-ui/react-slot";

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
    const Component = asChild ? Slot : "button";

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
