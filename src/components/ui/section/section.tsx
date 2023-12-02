import { polymorphicForwardRef } from "@/utils/polymorphic-forward-ref";
import { PropsWithChildren } from "react";
import cs from "classnames";
import styles from "./section.module.scss";

interface Props extends BaseProps, PropsWithChildren {
  bodyClass?: string;
  title?: string;
  subtitle?: string;
}

const Section = polymorphicForwardRef<"section", Props>(
  ({ className, title, subtitle, children, as, bodyClass, ...restProps }, ref) => {
    const Component = as || "section";

    return (
      <Component className={cs(styles["root"], className)} {...restProps}>
        <div className={styles["root__inner"]}>
          {(title || subtitle) && (
            <div className={styles["head"]}>
              {title && <h2 className={styles["head__title"]}>{title}</h2>}
              {subtitle && <h4 className={styles["head__subtitle"]}>{subtitle}</h4>}
            </div>
          )}
        </div>
        <div className={cs(styles["body"], bodyClass)}>{children}</div>
      </Component>
    );
  }
);

Section.displayName = "hoqn@section";

export default Section;
