"use client";

import { AnimationProps, motion } from "framer-motion";
import styles from "./common.module.scss";
import { useCallback, useEffect } from "react";

const animVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
} satisfies AnimationProps["variants"];

export default function Template({ children }: { children: React.ReactNode }) {
  const doOnAnimationStart = useCallback(() => {
    if (document)
      document.body.style.overflow = "hidden";
  }, []);
  
  const doOnAnimationComplete = useCallback(() => {
    if (document)
      document.body.style.overflow = "";
  }, []);

  return (
    <motion.div
      className={styles["main"]}
      variants={animVariants}
      initial="hidden"
      // exit="hidden"
      onAnimationStart={doOnAnimationStart}
      onAnimationComplete={doOnAnimationComplete}
      animate="show"
      transition={{
        bounce: 0,
        ease: "linear",
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
