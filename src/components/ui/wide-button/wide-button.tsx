"use client";

import { Slot } from "@radix-ui/react-slot";
import cs from "classnames";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import Button from "../button";
import styles from "./wide-button.module.scss";

interface Props extends BaseProps, PropsWithChildren {
  tint?: Parameters<typeof Button>[0]["tint"];
  loading?: Parameters<typeof Button>[0]["loading"];
  asChild?: boolean;
}

const WideButton = function ({ className, tint = "primary", loading, asChild, children, ...restProps }: Props & ComponentPropsWithoutRef<"button">) {
  const RootComponent = motion(Button);
  const ButtonComponent = asChild ? Slot : "button";

  return (
    <RootComponent
      className={cs(styles.root, className)}
      intent="contained"
      tint={tint}
      size="lg"
      loading={loading}
      asChild
    >
      <ButtonComponent {...restProps}>{children}</ButtonComponent>
    </RootComponent>
  );
};

WideButton.displayName = "ui@wide-button";

export default WideButton;
