import { Slot } from "@radix-ui/react-slot";
import { HTMLAttributes, PropsWithChildren, cloneElement, forwardRef, isValidElement } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLElement> {}

const NestedSlot = forwardRef<HTMLElement, Props>((props, ref) => {
  const { children, ...restProps } = props;

  if (isValidElement(children)) {
    const wrapper = cloneElement(children, { ...restProps }, children.props.children);

    return (
      <Slot>
        {wrapper}
      </Slot>
    );
  }

  return null;
});

NestedSlot.displayName = "hoqn@slot";

/**
 * 우선순위는 primaryProps가 더 높습니다.
 * @param primaryProps
 * @param secondaryProps
 */
function mergeProps(primaryProps: Record<string, any>, secondaryProps: Record<string, any>) {
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

export default NestedSlot;
