"use client";

import SearchBar from "@/components/search/SearchBar";
import { useRouter, usePathname } from "next/navigation";

export default function BookSearchBar({ initialValue }: { initialValue: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return <SearchBar initialValue={initialValue} onSubmit={(value) => router.push(`${pathname}?q=${encodeURI(value)}`)} />;
}
