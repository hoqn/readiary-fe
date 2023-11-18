import { polymorphicForwardRef } from "@/utils/polymorphic-forward-ref";
import { PropsWithChildren } from "react";
import cs from "classnames";
import { VariantProps, cva } from "class-variance-authority";
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
    },
  },
  defaultVariants: {
    tint: "neutral",
    intent: "tonal",
  },
});

interface Props extends BaseProps, PropsWithChildren, VariantProps<typeof $root> {}

const Button = polymorphicForwardRef<"button", Props>(
  ({ className, children, as, intent, tint, ...restProps }, ref) => {
    const Component = as || "button";

    return (
      <Component className={cs($root({ intent, tint }), className)} ref={ref} {...restProps}>
        <span className={cs("label")}>{children}</span>
      </Component>
    );
  }
);

Button.displayName = "ui@Button";

export default Button;
