import cs from "classnames";
import $ from "./Header.module.scss";

interface Props extends BaseProps {}

function Header({ className, ...restProps }: Props) {
  return (
    <div className={cs(className, $.header)}>
      <div className={$.header__inner}>
        <span className={$.header__brand}>BookDiary</span>
      </div>
    </div>
  )
}

export default Header;
