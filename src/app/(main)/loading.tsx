"use client";

import LoadingIndicator from "@/components/ui/LoadingIndicator";

export default function Loading() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      inset: "0 0 0 0",
    }}>
      <LoadingIndicator />
    </div>
  )
}