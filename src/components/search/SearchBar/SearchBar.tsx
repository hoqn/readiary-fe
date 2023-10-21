"use client";

import { ChangeEventHandler, FormEventHandler, useCallback, useState } from "react";
import cs from "classnames";
import IcBarcodeScanner from "@material-symbols/svg-400/rounded/barcode_scanner-fill.svg?svgr";
import $ from "./SearchBar.module.scss";

interface Props extends BaseProps {
  initialValue?: string;
  onSubmit: (value: string) => void;
}

function SearchBar({ className, initialValue = "", onSubmit, ...restProps }: Props) {
  const [value, setValue] = useState<string>(initialValue);

  const doOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>((ev) => {
    ev.preventDefault();
    setValue(ev.target.value);
  }, []);

  const doOnSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (ev) => {
      ev.preventDefault();
      onSubmit(value);
    },
    [onSubmit, value]
  );

  return (
    <div className={cs(className, $.searchBar)} {...restProps}>
      <form className={$.searchBar__form} onSubmit={doOnSubmit}>
        <input
          className={$.searchBar__input}
          type="search"
          placeholder="책 제목이나 저자 등을 입력해주세요"
          value={value}
          onChange={doOnChange}
        />
      </form>
      <button className={$.searchBar__barcodeButton}>
        <IcBarcodeScanner height={undefined} width={undefined} />
      </button>
    </div>
  );
}

export default SearchBar;
