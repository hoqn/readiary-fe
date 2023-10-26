"use client";

import SearchBar from "@/components/search/SearchBar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function BookSearchBar() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  return (
    <SearchBar
      initialValue={searchParams.get("q") || ""}
      onSubmit={(value) => router.push(`${pathname}?q=${encodeURI(value)}`)}
    />
  );
}
