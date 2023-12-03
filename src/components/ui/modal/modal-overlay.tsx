"use client";

import { KeyboardEventHandler, useCallback, useEffect } from "react";
import cs from "classnames";
import styles from "./modal.module.scss";

interface Props extends BaseProps {
  isCancelable?: boolean;
  onCancel?: Function;
}

export default function ModalOverlay({ className, isCancelable = false, onCancel }: Props) {
  const doCancel = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  /** disable Outer space scrolling */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /** cancel when escape button clicked */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || !isCancelable) return;

      if (e.key === "Escape" || e.key === "Esc") {
        onCancel && onCancel();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [isCancelable, onCancel]);

  return <div className={cs(styles["overlay"], className)} onClick={isCancelable ? doCancel : undefined}></div>;
}
