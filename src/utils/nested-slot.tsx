import { Slot } from "@radix-ui/react-slot";
import { HTMLAttributes, PropsWithChildren, cloneElement, isValidElement } from "react";

export function createNestedSlot<P extends PropsWithChildren = HTMLAttributes<HTMLElement>>(children: React.ReactNode) {
  if (isValidElement<PropsWithChildren>(children)) {
    return [
      ({ children: componentChildren, ...componentProps }: P) =>
        cloneElement(children, { ...mergeProps(children.props, componentProps) }, componentChildren),
      children.props.children,
    ] as const;
  } else {
    return [Slot, children] as const;
  }
}

/**
 * 우선순위는 primaryProps가 더 높습니다.
 * @param primaryProps
 * @param secondaryProps
 */
export function mergeProps(primaryProps: Record<string, any>, secondaryProps: Record<string, any>) {
  const ret = { ...secondaryProps, ...primaryProps };

  for (const propName in primaryProps) {
    const prProp = primaryProps[propName];
    const seProp = secondaryProps[propName];

    if (propName === "style") {
      ret[propName] = {
        ...seProp,
        ...prProp,
      };
    } else if (propName === "className") {
      ret[propName] = [seProp, prProp].filter((v) => !!v).join(" ");
    }
  }

  return ret;
}
