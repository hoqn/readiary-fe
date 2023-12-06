"use client";

import cs from "classnames";
import { MotionProps, motion } from "framer-motion";
import Button from "../button";
import styles from "./wide-button.module.scss";

interface Props extends Omit<PropsOf<typeof Button>, "intent" | "size"> {}

const WideButton = function ({
  className,
  tint = "primary",
  ...restProps
}: Props & MotionProps) {
  const RootComponent = motion(Button);

  return (
    <RootComponent
      className={cs(styles.root, className)}
      intent="contained"
      tint={tint}
      size="lg"
      whileTap={{
        scale: 0.96,
      }}
      {...restProps}
    />
  );
};

WideButton.displayName = "ui@wide-button";

export default WideButton;
