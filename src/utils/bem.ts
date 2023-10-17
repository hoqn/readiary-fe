// type GenerateBemClass = (...modifiers: (string | boolean)[]) => string;

// function _generateBemClass(
//   this: { binder: (str: string) => string },
//   item: string,
//   ...modifiers: (string | boolean)[]
// ): string {
//   return modifiers
//     .filter(Boolean)
//     .reduce<string>((ac, cu) => `${ac} ${this.binder(`${item}--${cu}`)}`, `${this.binder(`${item}`)}`);
// }

// type CssModule = Record<string, string>;

// type ParseBlockBE<BE extends string> = BE extends `${infer B}__${string}` ? B : BE;
// type ParseBlockBEM<BEM extends string> = BEM extends `${infer BE}--${string}` ? ParseBlockBE<BE> : ParseBlockBE<BEM>;

// type ParseElementBE<BE extends string, B extends string> = BE extends `${B}__${infer E}` ? E : never;
// type ParseElementBEM<BEM extends string, B extends string> = BEM extends `${infer BE}--${string}`
//   ? ParseElementBE<BE, B>
//   : ParseElementBE<BEM, B>;

// type ParseModifierBEM<BEM extends string, B extends string, E extends string | never> = E extends string
//   ? BEM extends `${B}__${E}--${infer M}`
//     ? M
//     : never
//   : BEM extends `${B}--${infer M}`
//   ? M
//   : never;

// // Block
// type BlockLit<S extends CssModule> = keyof S extends string ? ParseBlockBEM<keyof S> : never;

// // Element
// type ElementLit<S extends CssModule, B extends BlockLit<S> = BlockLit<S>> = keyof S extends string
//   ? ParseElementBEM<keyof S, B>
//   : never;

// // Modifier
// type ModifierLit<
//   S extends CssModule,
//   B extends BlockLit<S> = BlockLit<S>,
//   E extends ElementLit<S, B> | never = never
// > = keyof S extends string ? ParseModifierBEM<keyof S, B, E> : never;

// const block: BlockLit<S> = "block4";
// const element: ElementLit<S, "block4"> = "eq2";
// const mod: ModifierLit<S, "block", never> = "selected";

// type splitted = Split<keyof S, "__">;

// type S = {
//   block: "st";
//   "block--selected": "st";
//   block__e1: "st";
//   block__e23: "st";
//   block3__e234: "st";
//   "block__e2--selected": "st";
//   "block__e2--disabled": "st";
//   "block4__eq2--selected": "st";
// };

// // TS

// export const bemBlockBind =
//   <S extends CssModule>(styles: S, block: BlockLit<S>) =>
//   (element?: ElementLit<S>, ...modifiers: ModifierLit<S>[]) => {
//     let ret = `${block}`;

//     if (element) ret += `__${element}`;

//     if (modifiers.length) {
//       return modifiers.map((mod) => styles[`${ret}--${mod}`]).join(" ");
//     } else {
//       return styles[ret];
//     }
//   };

// // JS

// // class Bem<S extends CssModule> {
// //   binder: (str: string) => string;

// //   block: GenerateBemClass;
// //   element: (element: keyof S) => GenerateBemClass;

// //   constructor(block: string, bindings?: S) {
// //     this.binder = bindings ? (str) => bindings[str] : (str) => str;

// //     this.block = (...modifiers) => _generateBemClass.call(this, block, ...modifiers);
// //     this.element =
// //       (element) =>
// //       (...modifiers) =>
// //         _generateBemClass.call(this, `${block}__${element}`, ...modifiers);
// //   }
// // }

// // export default Bem;
