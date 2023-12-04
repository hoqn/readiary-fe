"use client";

import cs from "classnames";
import styles from "./rating-stars.module.scss";

import IcHalfStar from "@material-symbols/svg-400/rounded/star_rate_half-fill.svg";
import IcFullStar from "@material-symbols/svg-400/rounded/star_rate-fill.svg";
import IcEmptyStar from "@material-symbols/svg-400/rounded/star_rate.svg";
import { MouseEventHandler, TouchEventHandler, useCallback, useEffect, useRef, useState } from "react";

function Star({ value }: { value: number }) {
  if (value >= 0) return <IcFullStar />;
  else if (value === -1) return <IcHalfStar />;
  else return <IcEmptyStar />;
}

interface Props extends BaseProps {
  value: number;
  isEditable?: boolean;
  onEdit?: (value: number | null) => void;
}

export default function RatingStars({ className, value, isEditable, onEdit, ...restProps }: Props) {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const [isEditing, setEditing] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const doOnMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();

    if (isEditing && ref.current) {
      const bounding = ref.current.getBoundingClientRect();
      setDisplayValue(Math.round((10 * (e.pageX - bounding.x)) / bounding.width));
    }
  }, [isEditing]);
  
  const doOnMouseDown: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setEditing(true);
    if (ref.current) {
      const bounding = ref.current.getBoundingClientRect();
      setDisplayValue(Math.round((10 * (e.pageX - bounding.x)) / bounding.width));
    }
  }, []);
  
  const doOnMouseUp: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setEditing(false);
    if (ref.current) {
      const bounding = ref.current.getBoundingClientRect();
      const value = Math.round((10 * (e.pageX - bounding.x)) / bounding.width);

      setDisplayValue(value);
      onEdit && onEdit(value);
    }
  }, []);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div className={cs(styles["root"], isEditing && styles["root--editing"], className)} {...restProps}>
      <div
        className={styles["inner"]}
        onMouseMove={isEditable ? doOnMouseMove : undefined}
        onMouseDown={isEditable ? doOnMouseDown : undefined}
        onMouseUp={isEditable ? doOnMouseUp : undefined}
        ref={ref}
      >
        <Star value={displayValue - 2} />
        <Star value={displayValue - 4} />
        <Star value={displayValue - 6} />
        <Star value={displayValue - 8} />
        <Star value={displayValue - 10} />
      </div>
    </div>
  );
}
