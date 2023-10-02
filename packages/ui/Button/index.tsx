import type { PropsWithChildren } from "react";
import { polymorphicForwardRef } from "../utils/polymorphic";
import s from "./button.module.scss";

export interface ButtonProps extends PropsWithChildren {
  icon?: string;
  className?: string;
}

export const Button = polymorphicForwardRef<"button", ButtonProps>(({ children, className, as, ...restProps }, ref) => {
  const Wrapper = as || "button";

  return (
    <Wrapper className={`${className} ${s.button}`} ref={ref} type="button" {...restProps}>
      {children}
    </Wrapper>
  );
});
