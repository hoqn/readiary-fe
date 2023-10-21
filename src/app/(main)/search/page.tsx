import $ from "./page.module.scss";

import { Suspense } from "react";
import BookSearchBar from "./_BookSearchBar";
import SearchResult from "./_SearchResult";

export default async function page({ searchParams: { q = "" } }: { searchParams: Record<"q", string> }) {
  const searchValue = decodeURI(q);

  return (
    <div className={$.root}>
      <div className={$.searchSection}>
        <BookSearchBar initialValue={searchValue} />
      </div>
      <div className={$.bodySection}>{!!searchValue.length && <SearchResult searchValue={searchValue} />}</div>
    </div>
  );
}
