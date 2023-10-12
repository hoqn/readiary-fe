import type { PropsWithChildren } from "react";

export interface ButtonProps extends BaseProps, PropsWithChildren {
  /**
   * @default "neutral"
   */
  tint?: "primary" | "neutral";

  /**
   *
   * @default "tonal"
   */
  variant?: "tonal" | "contained" | "text";

  /**
   * 
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
}
