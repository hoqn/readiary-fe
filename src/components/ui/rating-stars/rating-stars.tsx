"use client";

import IcFullStar from "@material-symbols/svg-400/rounded/star_rate-fill.svg";
import IcEmptyStar from "@material-symbols/svg-400/rounded/star_rate.svg";
import IcHalfStar from "@material-symbols/svg-400/rounded/star_rate_half-fill.svg";
import cs from "classnames";
import {
  PointerEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import styles from "./rating-stars.module.scss";

export function Star({ value }: { value: number }) {
  if (value >= 0) return <IcFullStar />;
  else if (value === -1) return <IcHalfStar />;
  else return <IcEmptyStar />;
}

export interface Props extends BaseProps {
  value: number;
  isEditable?: boolean;
  onEdit?: (value: number | null) => void;
}

export default function RatingStars({ className, value, isEditable, onEdit, ...restProps }: Props) {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const [isEditing, setEditing] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const updateDisplayValue = (x: number) => {
    if (ref.current) {
      const bounding = ref.current.getBoundingClientRect();
      let value = Math.round((10 * (x - bounding.x)) / bounding.width);
      if (value < 0) value = 0;
      if (value > 10) value = 10;
      setDisplayValue(value);
      return value;
    }
  };

  const doOnPointerDown: PointerEventHandler = useCallback((e) => {
    e.preventDefault();
    setEditing(true);
  }, []);

  const doOnPointerMove: PointerEventHandler = useCallback((e) => {
    e.preventDefault();
    updateDisplayValue(e.clientX);
  }, []);

  const doOnPointerUp: PointerEventHandler = useCallback((e) => {
    e.preventDefault();
    setEditing(false);
    const value = updateDisplayValue(e.clientX);
    onEdit && onEdit(value || 0);
  }, [onEdit]);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div className={cs(styles["root"], isEditing && styles["root--editing"], className)} {...restProps}>
      <div className={styles["inner"]}>
        <Star value={displayValue - 2} />
        <Star value={displayValue - 4} />
        <Star value={displayValue - 6} />
        <Star value={displayValue - 8} />
        <Star value={displayValue - 10} />
        <div
          className={styles["touch-area"]}
          ref={ref}
          onPointerDown={isEditable ? doOnPointerDown : undefined}
          onPointerMove={isEditing ? doOnPointerMove : undefined}
          onPointerUp={isEditing ? doOnPointerUp : undefined}
        ></div>
      </div>
    </div>
  );
}
