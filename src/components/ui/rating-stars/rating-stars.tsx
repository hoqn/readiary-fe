import cs from "classnames";
import styles from "./rating-stars.module.scss";

import IcHalfStar from "@material-symbols/svg-400/rounded/star_rate_half-fill.svg";
import IcFullStar from "@material-symbols/svg-400/rounded/star_rate-fill.svg";
import IcEmptyStar from "@material-symbols/svg-400/rounded/star_rate.svg";

function Star({ value }: { value: number }) {
  if (value >= 0) return <IcFullStar />;
  else if (value === -1) return <IcHalfStar />;
  else return <IcEmptyStar />;
}

interface Props extends BaseProps {
  value: number;
  isEditable?: boolean;
  onEdit?: (value: number | null) => boolean;
}

export default function RatingStars({ className, value, isEditable, onEdit, ...restProps }: Props) {
  return (
    <div className={cs(styles["root"], className)} {...restProps}>
      <div className={styles["inner"]}>
        <Star value={value - 2} />
        <Star value={value - 4} />
        <Star value={value - 6} />
        <Star value={value - 8} />
        <Star value={value - 10} />
      </div>
    </div>
  );
}
