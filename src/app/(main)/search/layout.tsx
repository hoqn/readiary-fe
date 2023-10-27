import $ from "./layout.module.scss";

import { ReactNode, Suspense } from "react";
import BookSearchBar from "./_BookSearchBar";

export default async function layout({
  result,
}: {
  result: ReactNode;
}) {
  return (
    <div className={$.root}>
      <div className={$.searchSection}>
        <BookSearchBar />
      </div>
      <div className={$.bodySection}>{result}</div>
    </div>
  );
}
