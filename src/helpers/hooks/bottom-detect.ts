import { RefCallback, useCallback, useRef } from "react";

export function useBottomDetection<T extends HTMLElement = HTMLElement>(
  init: {
    onDetect?: (e: IntersectionObserverEntry) => void;
  } = {}
) {
  const observerRef = useRef<IntersectionObserver>();
  const oldElementRef = useRef<T>();

  const lastElementRef: RefCallback<T> = useCallback(
    (instance) => {
      if (!instance || !window) return;

      if (!observerRef.current)
        observerRef.current = new window.IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              init.onDetect && init.onDetect(entry);
            }
          });
        });

      // Cleanup on old element
      if (oldElementRef.current) observerRef.current.unobserve(oldElementRef.current);

      oldElementRef.current = instance;

      observerRef.current.observe(instance);
    },
    [init]
  );

  return {
    lastElementRef,
  };
}
