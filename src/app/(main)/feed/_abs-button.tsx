"use client";

import { AnimatePresence, motion } from "framer-motion";
import cs from "classnames";

import $ from "./_abs-button.module.scss";
import { useState } from "react";

function Ripple({ point }: { point: Record<"x" | "y", number> | null }) {
  return (
    <AnimatePresence mode="popLayout">
      <svg
        style={{
          position: "absolute",
          inset: "0 0 0 0",
        }}
        width="100%"
        height="100%"
      >
        {!!point && (
          <motion.circle
            cx={point.x}
            cy={point.y}
            r="100%"
            style={{
              // left: `calc(${point.x}px - 50%)`,
              // top: `calc(${point.y}px - 50%)`,
              // width: "100%",
              // height: "100%",
              backgroundColor: "var(--green-12)",
            }}
            initial={{
              scale: 0.2,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 0.2,
              transitionDelay: "1s"
            }}
            exit={{
              scale: 1.5,
              opacity: 0,
              transitionDelay: "2s"
            }}
          />
        )}
      </svg>
    </AnimatePresence>
  );
}

export default function AbsButton({ className }: BaseProps) {
  const [tapPoint, setTapPoint] = useState<Parameters<typeof Ripple>[0]["point"] | null>(null);

  return (
    <motion.button
      className={cs(className, $.absButton)}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        bounce: 0.5,
      }}
      onTapStart={(ev, info) => {
        setTapPoint({
          x: (ev as any).offsetX,
          y: (ev as any).offsetY,
        });
      }}
      onTap={() => {
        setTapPoint(null);
      }}
    >
      <span>읽고 있어요</span>
      <Ripple point={tapPoint} />
    </motion.button>
  );
}
