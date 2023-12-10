"use client";

import Image, { ImageProps } from "next/image";
import { useCallback } from "react";

interface Props extends Omit<ImageProps, "onError"> {}

export default function SafeImage({ alt, width, height, ...restProps }: Props) {
  const fallbackImgUrl = `https://placehold.co/${width}x${height}/E9F6E9/2A7E38?text=Readiary`;
  const doOnError: React.ReactEventHandler<HTMLImageElement> = useCallback((e) => {
    e.currentTarget.src = fallbackImgUrl;
  }, [fallbackImgUrl]);

  return (
    <Image alt={alt} width={width} height={height} {...restProps} onError={doOnError} />
  )
}