"use client";

import Button from "@/components/ui/button";
import Section from "@/components/ui/section";
import styles from "./scrap-section.module.scss";
import ScrapCard from "./scrap-card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { useEffect, useState } from "react";

interface Props {
  scraps: GetDiaryDetailResponse["scraps"];
}

export default function ScrapSection({ scraps }: Props) {
  const pathname = usePathname();

  return (
    <Section title="나의 스크랩" className={styles["scrap-section"]}>
      <div className={styles["scrap-button-wrapper"]}>
        <Button
          as={Link as React.ElementType}
          href={`${pathname}/scrap/new`}
          className={styles["scrap-button"]}
          tint="neutral"
          intent="tonal"
          size="lg"
        >
          스크랩 추가
        </Button>
      </div>
      <ul className={styles["scrap-list"]}>
        {scraps.map((scrap) => (
          <li key={scrap.scrapId} className={styles["scrap-item"]}>
            <ScrapCard data={{ ...scrap }} href={`${pathname}/scrap/${scrap.scrapId}`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
