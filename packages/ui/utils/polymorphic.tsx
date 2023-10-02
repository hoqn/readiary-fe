import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ReactElement } from "react";
import { forwardRef } from "react";

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];
type PropsWithRef<T extends ElementType, P = unknown> = P & { ref?: PolymorphicRef<T> };
type PropsWithAs<T extends ElementType, P = unknown> = P & { as?: T };
type PolymorphicComponentProps<T extends ElementType, P = unknown> = P & ComponentPropsWithoutRef<T> & PropsWithAs<T>;

export type PolymorphicForwardRefComponent<DefaultT extends ElementType, P = unknown> = <
  T extends ElementType = DefaultT,
>(
  props: PolymorphicComponentProps<T, P> & PropsWithRef<T>
) => ReactElement;

export const polymorphicForwardRef = forwardRef as <DefaultT extends ElementType, P = unknown>(
  render: <T extends ElementType = DefaultT>(
    props: PolymorphicComponentProps<T, P>,
    ref: PolymorphicRef<T>
  ) => ReactElement
) => PolymorphicForwardRefComponent<DefaultT, P>;
