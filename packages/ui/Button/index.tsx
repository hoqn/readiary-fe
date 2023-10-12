import c from "classnames";
import { bem } from "../utils/bem-classnames";
import { polymorphicForwardRef } from "../utils/polymorphic";
import s from "./button.module.scss";
import type { ButtonProps } from "./button.types";

const $button = bem.bind(s)("button");

export const Button = polymorphicForwardRef<"button", ButtonProps>(
  ({ as, className, children, size = "medium", tint = "neutral", variant = "tonal", ...restProps }, ref) => {
    const Wrapper = as || "button";

    return (
      <Wrapper
        className={c(className, $button(size, tint, variant))}
        ref={ref}
        type="button"
        {...restProps}
      >
        {children}
      </Wrapper>
    );
  }
);
